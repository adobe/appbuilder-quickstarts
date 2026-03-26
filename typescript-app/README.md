# TypeScript App Builder Quickstart

This example demonstrates how to use TypeScript in an Adobe App Builder application, for both **Runtime actions** and **UI components**.

## TypeScript support for Runtime actions

This project includes a TypeScript action at `actions/tsAction/index.ts`. The setup requires three pieces:

### 1. Webpack configuration

A `webpack-config.js` in the project root configures `ts-loader` to compile TypeScript during the build:

```javascript
module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  }
}
```

> If your project uses ES modules (`"type": "module"` in `package.json`), name this file `webpack-config.cjs` instead.

### 2. TypeScript configuration

A `tsconfig.json` in the project root:

```json
{
  "exclude": ["node_modules", "dist"],
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "sourceMap": true
  }
}
```

### 3. Action entry point in `app.config.yaml`

Point the `function` field directly to the `.ts` file:

```yaml
tsAction:
  function: actions/tsAction/index.ts
  web: 'yes'
  runtime: nodejs:22
```

No manual `tsc` compilation or duplicated source directories are needed. App Builder handles the compilation via Webpack automatically.

### Prerequisites

Install `ts-loader` and `typescript` as dev dependencies:

```bash
npm install --save-dev ts-loader typescript
```

## TypeScript support for UI

To use TypeScript in React components, use the `.tsx` extension and add the following to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

## Setup

- Populate the `.env` file in the project root (generate it with `aio app use`)

```bash
# This file must **not** be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```

## Local Dev

- `aio app dev` to start your local dev server
- App will run on `localhost:9080` by default

## Test & Coverage

- Run `aio app test` to run unit tests for UI and actions
- Run `aio app test --e2e` to run e2e tests

## Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app

## Debugging in VS Code

While running your local server (`aio app dev`), both UI and actions can be debugged. Open the VS Code debugger and select the debugging configuration called `App Builder: debug actions` or `App Builder: debug full stack`.

Adding `devtool: 'inline-source-map'` to `webpack-config.js` (already included in this example) enables source map support for stepping through TypeScript code in the debugger.

## More information

- [TypeScript Actions documentation](https://developer.adobe.com/app-builder/docs/guides/configuration/typescript-actions/)
- [Webpack Configuration documentation](https://developer.adobe.com/app-builder/docs/guides/configuration/webpack-configuration/)
- [App Builder Configuration Files](https://developer.adobe.com/app-builder/docs/guides/configuration/)
