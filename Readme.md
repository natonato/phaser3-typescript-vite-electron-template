# Phaser-Typescript-Vite-Electron Template

**version : 2.0**

## Simple Template With

![Phaser](https://img.shields.io/badge/phaser-A100FF.svg?style=for-the-badge&logo=phaser&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)

- [Phaser](https://phaser.io/) : HTML5 Game Framework
- [TypeScript](https://www.typescriptlang.org/) : Better than JavaScript
- [Vite](https://vitejs.dev/) : To Build Project
- [Electron](https://electronjs.org/) : To Run game standalone
  - [Electron-Packager](https://github.com/electron/packager) : And package it.

And

- Fixed Ratio (16:9)
- Simple Scene movement & Quit App
- Option scene
  - Change resolution / Toggle fullscreen
  - Change language
  - Change Sound/SFX Volume
- Grayscale Shader Example
- Hot Reload Electron
- Generate StandAlone exe file

## Project Structure

```
|   main.js
|   index.html
+---public/assets
    +---data
    +---fonts
    \---...
\---src
    |   Game.ts
    |   Config.ts
    +---assets
    \---scene
        |   TitleScene.ts
        |   GameScene.ts
        \---...
```

`main.js` Entry point for Electron
`index.html` Entry point for phaser
`Game.ts` Where game created
`public/assets` Assets folder

## Getting Started

### Before Run

```sh
npm install
```

### Build

- Might not work in normal browser

```sh
npm run build
```

### Run with electron

```sh
npm run cold
```

### Run with electron and chrome dev tool

```sh
npm run debug
```

### Run with electron and hot reloading

```sh
npm run hot
```

### Run with electron and chrome dev tool and hot reloading

```sh
npm run debug:hot
```

### Generate exe

```sh
npm run exe:portable
```

## Music/SFX file Source

[<img src="https://img.shields.io/badge/pixabay-2EC66D?style=for-the-badge&logo=pixabay&logoColor=white">](https://pixabay.com/)

## Font file Source

[Link](https://cactus.tistory.com/193)

## A feature I wanted to add but failed to

HMR

- After modifying and saving the code, refresh only the current phaser scene, not the entire electron app.
