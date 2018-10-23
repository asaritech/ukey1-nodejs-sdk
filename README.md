# Ukey1 SDK for NodeJS

This repository contains the open source NodeJS SDK that allows you to access the **[Ukey1 API](https://ukey.one)** from your NodeJS app.

## About Ukey1

[Ukey1](https://ukey.one) is an Authentication and Data Protection Service with the mission to enhance security of websites.
The service is designed to help you with EU GDPR compliance.

### Ukey1 flow for this NodeJS SDK

1. User clicks to "sign-in" button
  - you may use our [unified sign-in button](https://github.com/asaritech/ukey1-signin-button)
2. SDK sends a connection request to our API and gets a unique Gateway URL
3. User is redirected to Ukey1 Gateway
4. User signs in using their favourite solution and authorizes your app
5. User is redirected back to predefined URL
6. SDK checks the result and gets a unique access token
7. That's it - user is authenticated (your app can make API calls to get user's data)

### API specification

- [API specification](https://ukey1.docs.apiary.io/)
- [Documentation](https://asaritech.github.io/ukey1-docs/)

## Installation

```bash
$ npm i ukey1-nodejs-sdk --save
```

## Usage

First, you need [credentials](https://dashboard.ukey.one/developer) (`App ID` and `Secret Key`). In our dashboard, we also recommend to activate as many protections as possible.

### Sign-in / sign-up / log-in - all buttons in one

Your app may look like this (of course, it's only an example):

```html
<html>
  <head>
    <!-- ... -->
    <link rel="stylesheet" type="text/css" href="https://code.ukey1cdn.com/ukey1-signin-button/master/css/ukey1-button.min.css" media="screen">
  </head>
  <body>
    <!-- ... -->
    <a href="/login" class="ukey1-button">Sign in via Ukey1</a>
    <!-- ... -->
  </body>
</html>
```

### Connection request

Your controller located on `/login` endpoint makes a request to our endpoint `/auth/v2/connect`.

```javascript

```

### Requests for access token and user details

Once the user authorizes your app, Ukey1 redirects the user back to your app to the URL you specified earlier.
The same is done if user cancels the request.

URL will look like this: `http://example.org/login?action=check&user=XXX&_ukey1[request_id]={REQUEST_ID}&_ukey1[connect_id]={CONNECT_ID}&_ukey1[code]={CODE}&_ukey1[result]={RESULT}&_ukey1[signature]={SIGNATURE}#fragment`
where `REQUEST_ID` is a previously used `$requestId`, `CONNECT_ID` is a previously used `$connectId`, `CODE` is a one-time code for getting the access token
`RESULT` may be *authorized* or *canceled* and `SIGNATURE` is a security signature.

```javascript

```

## Premium features

### Private users

This feature also known as *Extranet users* (must be enabled in Ukey1 dashboard) is useful when you want to implement Ukey1 into your private app where only predefined users can access (typically employees within company extranet).

The flow is similar. First, in your private app you need to have a simple user management. No password needed, only roles (if applicable), our User ID (that you will get at the end of the flow as usually) and Extranet Reference ID. This Reference ID serves for user deletion in the further future.

In your own user management, when you create a new user, you also have to make a POST request to our endpoint `/auth/v2/extranet/users`.

```php

```

For install purposes (it means when no user is in your user management database), the owner of the app in Ukey1 dashboard is automatically authorized to log in to your app. Just log in like in case of a public app.

Please note that each environment is separate for this feature, so when you add new user on test environment, you have to add them again for production environment (and vice versa) if you need so.

## License

This code is released under the MIT license. Please see [LICENSE](https://github.com/asaritech/ukey1-nodejs-sdk/blob/master/LICENSE) file for details.

## Contributing

If you want to become a contributor of this NodeJS SDK, please first contact us (see our email below).
If you would like to work on another SDK (in your favorite language), we will glad to know about you too!

## Contact

Reporting of any [issues](https://github.com/asaritech/ukey1-nodejs-sdk/issues) are appreciated.
If you want to contribute or you have found a critical bug, please write us directly to [developers@asaritech.com](mailto:developers@asaritech.com).
