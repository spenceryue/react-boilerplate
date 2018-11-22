Setup
===
Make sure you have Node.js (8.10.0) and yarn (1.12.3) installed.

1. Run `yarn install` to download required dependencies to `node_modules` folder.
2. See `package.json` for available command line scripts under the "scripts" field.
3. To test the frontend with pusher.com run `yarn dev && yarn pusher & yarn start`. A new browser tab will open with the frontend and the pusher script will run in the background.

Currently it should look like this:
![preview][preview1]

TODOs
===
- Consider [Service Worker Push API][1] and web-push instead of Pusher.
    - Needs service worker setup
- Investigate interface between Node and C program.
- Work out kinks with d3 to generate UI component plots.
    - Requirements include:
        - Data update animation
        - Entrace animation
        - Interactivity animation (drag+drop, zoom, pan, drop-down configuration menu)
- Two alternatives:
    - Create authenticated API for CRUD database operations
        - Consider JSON Web Tokens and GraphQL
        - Or consider Firebase
    - Set up private Pusher channel and have web server subscribe
- Consider React Router for single page app


[1]: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications#pushapi
[preview1]: preview1.gif