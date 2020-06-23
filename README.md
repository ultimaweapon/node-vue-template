# Node.js + Vue.js project template with TypeScript

This is a template for creating a SPA with Vue.js as a front-end and Node.js as a back-end. Current available features are:

- Utilizing TypeScript for both front-end and back-end.
- Code sharing between front-end and back-end.
- A robust application state management build on top of Vuex.
- SASS as a style sheet language with SCSS syntax.
- Pre-configured `vue-loader` to support SFC with TypeScript and SCSS.
- Fast loading with dynamic importing to support a loading progress for a large application.
- Pre-configured BootstrapVue.
- Runtime-only mode for Vue.js (no template compiler on the distributed JavaScript).
- Supports both production and development mode on the front-end side.
- Supports long-term caching on production mode.
- Supports TypeScript debugging on both front-end and back-end. For front-end only supported when build in a development mode.
- Shipped with configurations for Visual Studio Code for building and debugging both front-end and back-end out of the box.
- Code snipped for Visual Studio Code for scaffolding the repetitive tasks.

## Web Browser requirements

- Full ES2015 (ES6) supports.
- Fetch API supports.

All modern browsers already supported both. So you should be fine as long as your target users does not come from the ancient world.

## How to use

Just update the project name in `package.json` then execute:

```sh
npm install
```

Once finished you need to update the remote URL for Git with the following command:

```sh
git remote set-url origin URL
```

Now you are ready to go.
