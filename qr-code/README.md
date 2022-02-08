
## Setup

### Populate the `.env` file in the project root

```bash
# This file must not be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```

### Build and Deploy

```sh
npm i
aio app get-url
aio app deploy
```

Open the url, it will have the form:

`https://<AIO_RUNTIME_NAMESPACE>.adobeioruntime.net/api/v1/web/qr-code-demo/get-qr-code?url=<add-your-url-to-qr-here>`

