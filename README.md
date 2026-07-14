# Contra Tenebras Episode Brain

A simple episode-first shared workspace for planning the Contra Tenebras channel.

## Preview

Open `index.html` directly, or run a small local server from this folder:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Included

- Episodes displayed in order
- A separate working space for every episode
- Content ideas, notes/questions, and quotes/sources
- A typed contributor name attached to every addition
- The real Episode 1 thesis and seven-segment outline
- A full production-to-publish checklist for every episode
- Live progress bars, task owners, deadlines, and custom tasks
- Organized links for scripts, slides, research, audio, and video
- Easy creation of additional episodes
- Responsive desktop and mobile layouts

Additions are always backed up in the current browser with `localStorage`. When Firebase is configured, the same work also synchronizes across browsers and computers through Cloud Firestore.

## Cross-browser sync

The app now includes an optional Firebase Firestore sync layer. Without Firebase configuration, it continues to save safely in the current browser.

To enable shared live saving:

1. Create a Firebase project and register a Web app.
2. Enable Firestore Database.
3. Enable Anonymous authentication.
4. Copy the Web app configuration values into `firebase-config.js`.
5. Publish the included `firestore.rules` in the Firebase console.

Once configured, all episodes, plans, ideas, notes, quotes, production tasks, assignments, deadlines, links, and progress sync through the shared `contra-tenebras` workspace. Firestore’s persistent browser cache also queues changes while temporarily offline.
