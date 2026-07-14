import { firebaseConfig } from "./firebase-config.js";

let workspaceReference = null;
let writeWorkspace = null;
let serverTime = null;
let storageService = null;
let storageModule = null;

const isConfigured = () => Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

export async function startSync(seedData, onData, onStatus) {
  if (!isConfigured()) {
    onStatus("local", "Saved locally");
    return false;
  }

  try {
    onStatus("connecting", "Connecting…");
    const [{ initializeApp }, firestore, authentication, storage] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js"),
      import("https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js")
    ]);

    const app = initializeApp(firebaseConfig);
    const database = firestore.initializeFirestore(app, {
      localCache: firestore.persistentLocalCache({
        tabManager: firestore.persistentMultipleTabManager()
      })
    });
    await authentication.signInAnonymously(authentication.getAuth(app));
    storageService = storage.getStorage(app);
    storageModule = storage;

    workspaceReference = firestore.doc(database, "workspaces", "contra-tenebras");
    writeWorkspace = firestore.setDoc;
    serverTime = firestore.serverTimestamp;

    firestore.onSnapshot(workspaceReference, { includeMetadataChanges: true }, async snapshot => {
      if (!snapshot.exists()) {
        await saveWorkspace(seedData);
        return;
      }

      const data = snapshot.data();
      if (Array.isArray(data.episodes) && Array.isArray(data.cards)) {
        onData({ episodes: data.episodes, cards: data.cards, files: Array.isArray(data.files) ? data.files : [] });
      }
      onStatus(snapshot.metadata.fromCache ? "offline" : "synced", snapshot.metadata.fromCache ? "Offline — changes queued" : "Synced across browsers");
    }, error => {
      console.error("Sync listener failed", error);
      onStatus("error", "Sync unavailable");
    });

    return true;
  } catch (error) {
    console.error("Firebase setup failed", error);
    onStatus("error", "Saved locally — sync setup needed");
    return false;
  }
}

export async function saveWorkspace(data) {
  if (!workspaceReference || !writeWorkspace) return false;
  await writeWorkspace(workspaceReference, {
    episodes: data.episodes,
    cards: data.cards,
    files: data.files || [],
    updatedAt: serverTime()
  }, { merge: true });
  return true;
}

export async function uploadEpisodeFile(file, episodeId, onProgress) {
  if (!storageService || !storageModule) throw new Error("Shared file storage is not connected yet.");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const path = `workspaces/contra-tenebras/episodes/${episodeId}/${Date.now()}-${safeName}`;
  const fileReference = storageModule.ref(storageService, path);
  const task = storageModule.uploadBytesResumable(fileReference, file, { contentType: file.type || "application/octet-stream" });

  await new Promise((resolve, reject) => task.on("state_changed", snapshot => {
    const percent = snapshot.totalBytes ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) : 0;
    onProgress(percent);
  }, reject, resolve));

  return {
    path,
    url: await storageModule.getDownloadURL(task.snapshot.ref),
    name: file.name,
    size: file.size,
    type: file.type || "File",
    uploadedAt: new Date().toISOString()
  };
}

export async function deleteEpisodeFile(path) {
  if (!storageService || !storageModule) throw new Error("Shared file storage is not connected yet.");
  await storageModule.deleteObject(storageModule.ref(storageService, path));
}
