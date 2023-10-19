# havrepaire-front

This application's frontend is developped with Vue 3, Pinia and Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Icons
- [FlagIcons](https://www.npmjs.com/package/vue-flag-icon)
- Hand-made icons (protected by French authors rights)

## Project Setup

```sh
npm install
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

(not available yet)
```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

(not available yet)
```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
