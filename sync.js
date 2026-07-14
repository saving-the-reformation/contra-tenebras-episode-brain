import { firebaseConfig } from "./firebase-config.js";

let workspaceReference = null;
let writeWorkspace = null;
let serverTime = null;

const isConfigured = () => Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

export async function startSync(seedData, onData, onStatus) {
  if (!isConfigured()) {
    onStatus("local", "Saved locally");
    return false;
  }

  try {
    onStatus("connecting", "Connecting…");
    const [{ initializeApp }, firestore, authentication] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js"),
      import("https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js")
    ]);

    const app = initializeApp(firebaseConfig);
    const database = firestore.initializeFirestore(app, {
      localCache: firestore.persistentLocalCache({
        tabManager: firestore.persistentMultipleTabManager()
      })
    });
    await authentication.signInAnonymously(authentication.getAuth(app));

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
