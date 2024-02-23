# App Builder PWA demo

This is a basic PWA app. It includes typical pwa meta in index.html and icons.
index.html has a script to register a service-worker.

## Try it

`aio app init --repo adobe/appbuilder-quickstarts/progressive-web-app`

## Setup

- Populate the `.env` file in the project root and fill it as shown [below](#env)
- `npm install`

Note: This app adds a couple npm modules to support icons and pwas
- "@parcel/packager-raw-url"
- "@parcel/transformer-webmanifest"

Images are stored in src/dx-excshell-1/web-src/images/

## Config

### `.env`

You can generate this file using the command `aio app use`.

```bash
# This file must **not** be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```
