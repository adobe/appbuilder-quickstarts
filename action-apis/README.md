# action-apis

This is a simple app that shows how you can define APIs for your Runtime actions. 

## Setup

- Populate the `.env` file in the project root

You can generate this file using the command `aio app use`. 

```bash
# This file must **not** be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```

## Build and Deploy

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio runtime api list /v1` will show you the URL for the newly deployed API

Note: It can take up to five minutes for a new API configuration to come up and be ready to accept requests.
