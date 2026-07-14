# Contra Tenebras — Hosting and Shared Saving

The site can use **GitHub Pages for hosting** and **Firebase Cloud Firestore for shared saving**. You can also host the same files directly on **Firebase Hosting** instead of GitHub Pages.

## Files to upload to GitHub

Upload these files to the repository root:

- `.nojekyll`
- `index.html`
- `styles.css`
- `app.js`
- `sync.js`
- `firebase-config.js`
- `firestore.rules`
- `firebase.json`
- `README.md`
- `HOSTING_AND_SYNC.md`

Do not upload the Word documents unless you want them publicly downloadable.

# Option A — GitHub Pages + Firestore

## Part 1: Create the GitHub repository

1. Sign in at GitHub.
2. Select the **+** menu in the upper-right corner.
3. Choose **New repository**.
4. Set the repository name to `contra-tenebras-episode-brain`.
5. Choose **Public**. GitHub Pages is available for public repositories on GitHub Free.
6. Leave **Add a README**, `.gitignore`, and license unchecked because this folder already contains the files.
7. Click **Create repository**.

## Part 2: Upload the files

1. On the empty repository page, click **uploading an existing file**.
2. Drag all files listed above into the upload area.
3. Wait until every file finishes uploading.
4. In the commit box, enter `Publish Contra Tenebras episode workspace`.
5. Click **Commit changes**.

## Part 3: Turn on GitHub Pages

1. Open the repository’s **Settings** tab.
2. In the left sidebar, select **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch **main**.
5. Select folder **/ (root)**.
6. Click **Save**.
7. Wait one to five minutes and refresh the Pages settings screen.
8. GitHub will show a live address similar to:
   `https://YOUR-USERNAME.github.io/contra-tenebras-episode-brain/`

Every later commit to `main` republishes the website automatically.

# Set up Firebase Firestore shared saving

## Part 1: Create and register the Firebase app

1. Open the Firebase console and click **Create a project**.
2. Name it `Contra Tenebras` and finish project creation. Google Analytics is optional.
3. On the project overview screen, click the **Web** icon (`</>`).
4. Enter the app nickname `Contra Tenebras Episode Brain`.
5. Do not select Firebase Hosting yet if GitHub Pages will host the site.
6. Click **Register app**.
7. Firebase displays a `firebaseConfig` object. Keep this page open.
8. Open `firebase-config.js` and paste each value into its matching empty field.
9. Upload the completed `firebase-config.js` to GitHub and commit the change.

The Firebase web configuration is designed to be included in client-side code. Database protection comes from Authentication and Firestore Security Rules, not from hiding this configuration object.

## Part 2: Enable anonymous authentication

1. In Firebase, open **Build → Authentication**.
2. Click **Get started**.
3. Open **Sign-in method**.
4. Select **Anonymous**.
5. Turn on **Enable** and save.

This lets the team type display names in the app without creating separate passwords while still giving every browser an authenticated Firebase session.

## Part 3: Create Cloud Firestore

1. Open **Build → Firestore Database**.
2. Click **Create database**.
3. Choose **Standard edition**.
4. Choose a region near the team. The region cannot be changed later.
5. Choose **Production mode** and create the database.
6. Open the **Rules** tab.
7. Replace the rules with the contents of `firestore.rules`.
8. Click **Publish**.

The included rule only allows authenticated Firebase sessions to read or change the `workspaces/contra-tenebras` document. Because the app uses anonymous authentication, anyone who has the public site link can join the workspace. For a more private version, replace anonymous authentication with Google sign-in and an approved-email allowlist.

## Part 4: Confirm syncing

1. Open the live website.
2. The top-right badge should change from **Saved locally** to **Synced across browsers**.
3. Add a test note.
4. Open the website in another browser or on another computer.
5. The test note should appear automatically.

Firestore also keeps a persistent browser cache. If the connection drops, edits are queued and synchronized when the browser reconnects. If two people change the same complete workspace document at exactly the same time, the last saved version wins.

# Option B — Host directly on Firebase Hosting

Use this if you prefer a `web.app` address and want hosting and Firestore in the same Google project.

## Install and sign in

In Terminal, run:

```bash
npm install -g firebase-tools
firebase login
```

## Connect the folder to the project

Open Terminal in this folder and run:

```bash
firebase use --add
```

Select the Firebase project you created and name the alias `default`.

The included `firebase.json` already tells Firebase which files to host and points to `firestore.rules`, so you do not need to run `firebase init`.

## Deploy hosting and rules

Run:

```bash
firebase deploy --only hosting,firestore:rules
```

Firebase will return two live addresses:

- `https://YOUR-PROJECT-ID.web.app`
- `https://YOUR-PROJECT-ID.firebaseapp.com`

Later updates use the same deploy command.

# Recommended final setup

- Keep the source files in GitHub for version history and easy updates.
- Use GitHub Pages as the public link if you want the GitHub-branded address.
- Use Cloud Firestore for the shared content database.
- Consider Google sign-in with a team allowlist before sharing the link widely.

# Episode material links

The **Files** tab stores named links to scripts, outlines, slides, research sources, audio, video, and other materials. Documents can remain in Google Drive, Dropbox, YouTube, or another service. Only the small link records synchronize through Firestore, so Firebase Cloud Storage and a billing upgrade are not required.
