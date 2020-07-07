# React Boilerplate (Redux, Typescript)

## Prerequisites

1. [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
2. [Homebrew](https://brew.sh/)

## Getting Started (Local Setup)

##### 1. Install Node

- `nvm install node`

##### 2. Install Node Modules
- `brew update`
- `brew install yarn`
- `yarn`

##### 3. Initialize Environment Variables (local)
- `cp .env.example .env.local`
- (optional) update `PROJECT_PREFIX` in `.env.local`

##### 3. Run Webpack
- `yarn start`
```
｢wds｣: Project is running at http://localhost:3000/
｢wds｣: webpack output is served from /
...
｢wdm｣: Compiled successfully.
```

## Resources
- [original boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate)
------

### OLD README BELOW

# 

# Frontend Boilerplate with React, Redux & TypeScript

A bare minimum react-hooks-redux-webpack-typescript boilerplate with TodoMVC example.

Note that this project does not include **Server-Side Rendering**, **Static code analysis**, **Testing Frameworks**
If needed, please fork this repository and add your own that meets your requirements.

Ideal for creating React apps from the scratch.

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 3.8
- [x] [React](https://facebook.github.io/react/) 16.12
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [Redux Thunk](https://github.com/reduxjs/redux-thunk) 2.3
- [x] [React Router](https://github.com/ReactTraining/react-router) 5.1
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [TodoMVC example](http://todomvc.com)

### Build tools

- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [PostCSS Preset Env](https://preset-env.cssdb.org/)
  - [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)

## Installation

```
$ npm ci
```

## Running

```
$ npm start
```

## Build

```
$ npm run build
```

## Deploy (to the [GitHub Pages](https://pages.github.com/))

```
$ npm run deploy
```

# License

MIT
