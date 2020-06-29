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

## Web browser requirements

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

## Getting started on development

To build from a command line, run:

```sh
npm run build
```

Once build is completed you can start a server by:

```sh
npm start
```

You can also build and debugging from Visual Studio Code. To build, select `Run Build Task...` from `Terminal` menu. To start debugging, select `Start Debugging` from `Run` menu.

## Create a tarball for deployment

You can run the following command to create a distribution tarball:

```sh
npm pack
```

This will produce a `PACKAGE_NAME-PACKAGE_VERSION.tgz` in the project directory. It will include only required files to run the application (e.g. `lib` but not `src`). Please note the above command will not trigger the build processes so you need to build the project before you run it.

Before you can start the application that distributed with this method you need to run the following command in the extracted directory:

```sh
npm install
```

Now you can start the application with:

```sh
npm start
```

## Deploy to production

The build process is in development mode by default. To build for a production you need to set `NODE_ENV` environment variable with value `production`. The server is also running in development mode by default too, which also using the same `NODE_ENV` to control which mode to run. The following will applied on production mode:

- Assets for the client get minified.
- No source map is generated for the client assets.
- Vue.js is in production mode so Vue Devtools will not work.
- The server will no longer serve the assets for the client. You need to use the other softwares for this job (e.g. NGINX).
- `npm install` will not install development dependencies.
