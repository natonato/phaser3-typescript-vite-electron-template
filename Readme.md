# Phaser-Typescript-Vite-Electron Template

- Translator used

## Simple Template With

- [Phaser](https://phaser.io/) : HTML5 Game Framework
- [TypeScript](https://www.typescriptlang.org/) : Better than JavaScript
- [Vite](https://vitejs.dev/) : To Build Project
- [Electron](https://electronjs.org/) : To Run game standalone
  - [Electron-Packager](https://github.com/electron/electron-packager) : And package it.

And

- Fixed Ratio (16:9)
- Simple Scene movement & Quit App test
- Hot Reload Electron
- Generate StandAlone exe file

## Project Structure

```
|   main.ts
\---src
    |   Game.ts
    |   index.html
    +---assets
    \---scene
            SceneOne.ts
            SceneTwo.ts
```

`main.ts` File is entry point for Electron
`src/index.html` File is entry point for phaser
`Game.ts` File is where game created
`assets` Folder have assets

## Getting Started

### Before Run

```sh
npm install
```

### Build

```sh
npm run build
```

### Run with browser (port 3000)

```sh
npm run start
```

### Run with electron (locally, hot reloading)

```sh
npm run hot
```

### Run with electron (with build)

```sh
npm run cold
```

### Generate standalone exe (In exe folder)

```sh
npm run exe:portable
```

## Current...issue? something

- ESM - Commonjs compatibility

  - Electron provides IPC for communication between the client (Phaser) and the server (electron)
  - Vite use native ESM
  - Electron do not support ESM ([issue](https://github.com/electron/electron/issues/21457))
  - So maybe I should convert the ESM of Vite to CJS and use it, but it just didn't work out. (IDK Why)

- Electron `useContentSize` not working properly

  - Electron appears to include a title bar and menu in width/height by default
  - `useContentSize` option was expected to solve this problem because it takes the size of the browser window and uses it, but the problem is that the phaser has set the 'height:100%' option throughout the document

- Running Electron with Devtool, keyboard input ignored

  - Devtool snatched keyboard input

- There was a bug in the Electron `24.x.x`, so I used the 23 version instead
