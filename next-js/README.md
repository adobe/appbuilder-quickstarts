# Next.js 12 on Runtime

This is a Tailwind-styled Next.js starter app hosted on Adobe I/O Runtime that demonstrates how to use a number of Next features, including: 

- Middleware
- Server-Side Props 
- Static Props
- APIs (using swr)

## Try it

`aio app init --repo adobe/appbuilder-quickstarts/next-js`

## Install dependencies

`npm install`

## Config

### `.env`

You can generate this file using the command `aio app use`.

```bash
# This file must **not** be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```

## Running locally

`npm run dev && open localhost:3000`

### Deploy 

`npm run deploy`
