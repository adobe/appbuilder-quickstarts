# action-apis

This is a simple app that shows how you can define APIs for your Runtime actions. 

Three APIs will be deployed: 
- GET {baseUrl}/v1/roster - Get basketball roster
- POST {baseUrl}/v1/roster - Add player to basketball roster
- DELETE {baseUrl}/v1/roster/{id} - Remove player from basketball roster

Try it out: `aio app init --repo adobe/appbuilder-quickstarts/action-apis`

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
- `aio runtime api list /v1` will show you the URLs for the newly deployed APIs

Note: It can take up to five minutes for a new API configuration to come up and be ready to accept requests.
