# Le Havrepaire

This application is a 100% personalized blog for literary publications. It is entirely developped by the author themselves.
It relies on Vue 3, Sass, Nest.js and MongoDB.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) 
[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) 
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Setup project and launch in dev mode (with hot reload)

```sh
cd havrepaire-api
npm install
npm run start:dev
```

```sh
cd havrepaire-front
npm install
npm run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## How can I participate ?
This is a small enterprise project. I am the developer and writer, and am willing to publish my literary work on this website. Hence all the contents on this repository, including the code, are protected by French authors rights.
However all the contents are free to read as the primary aim of this website is to share my work.

You can help this project by raising issues or sending comments.

Alternatively, you can ask me to add your SSH key so you can clone the repository and take part to this project.


## Project architecture

### Global architecture
The API is a Nest.js API and is saved in the *havrepaire-api* directory.
The front-end application is developed with Vue 3 and stored in the *havrepaire-front* directory.
If you are willing to participate, please follow DRY and clean code rules as much as you can.

### Syntax rules
- 4 spaces indentation
- split lines into a few lines if they are too long
- use semi-colons
- use capitalized names for interface names and classes names

### About frontend components imports
- Particles (components that are used in various views) are stored in the *particles* directory and imported globally in the *main.ts* file.
- Other components are stored in the *components* directory and imported in views / components that need them.
- Global styling elements (global theme, variables, mixins, colour-palette) are stored in the *styles* directory and can be imported in any component file. Just add ```@use '@/styles/theme.scss' as *;``` inside your ```<style lang="scss">``` tag.

## Useful tools

### Icons
- [FlagIcons](https://www.npmjs.com/package/vue-flag-icon)
- Hand-made icons (protected by French authors rights)

### Optimize images for the web
- [Squoosh](https://squoosh.app/)
