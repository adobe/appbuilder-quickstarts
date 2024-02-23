

# action-sequences

A simple demo of various Adobe Runtime action manifests you can use to define sequences.

> see /src/dx-excshell-1/ext.config.yaml for reference

`hello` and `hello-frank` actions both use the same code, but `hello` specifies `require-adobe-auth: true` so it cannot be called without auth headers.

`fellowship_membership` defines a sequence of action which calls each action in order `member_join, member_process, member_equip`
This sample is from the [OpenWhisk/wsk-deploy documentation](https://github.com/apache/openwhisk-wskdeploy/blob/master/docs/wskdeploy_sequence_basic.md) and lets you join the fellowship.  Call the sequence with
```
{
    "name": "frodo",
    "place": "Hobbiton",
    "job": "gentleman"
 }
 ```
if you want to carry the ring.

> warning: it won't be easy, but ...
>
> _"Even the smallest person can change the course of the future."_


## Setup

- Populate the `.env` file in the project root and fill it as shown [below](#env)

## Local Dev

- `aio app run` to start your local Dev server
- App will run on `localhost:9080` by default

By default the UI will be served locally but actions will be deployed and served from Adobe I/O Runtime.

## Config

### `.env`

You can generate this file using the command `aio app use`.

```bash
# This file must **not** be committed to source control

## please provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
```
