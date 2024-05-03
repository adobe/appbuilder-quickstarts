
# Quickstart :: Async Request Reply

This basic app demonstrates how to implement an action poll when you have a long running action.
In this case, long running means 200 seconds, much longer than the 30-60 timeout for a web-action.

The web action `polling` will invoke the non-web worker action `long-running` and return an `activationId`

Subsequent `polling` calls should include the`{activationId:<activationId>}` so `polling` can check the activation record for a result.  Upon completion, `polling` will return the result of `activationId`

You can install and run this app yourself!

    aio app init --repo adobe/appbuilder-quickstarts/async-request-reply
    aio app run


<img width="574" alt="Screenshot 2024-05-02 at 8 55 47 PM" src="https://github.com/adobe/appbuilder-quickstarts/assets/46134/30c6ece8-94cf-49c7-ace3-42722e860c10">
