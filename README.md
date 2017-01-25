# Ukey1 SDK for NodeJS

This repository contains the open source NodeJS SDK that allows you to access the **[Ukey1 API](http://ukey.one)** from your NodeJS app.

## IMPORTANT NOTICE: This SDK is currently in development stage.

## About Ukey1

[Ukey1](http://ukey.one) is *an aggregator of your user's social identities*. 
Ukey1 is also a [OAuth 2.0](https://oauth.net/2/) provider but what is more important, it connects all major identity providers 
(like [Google](https://developers.google.com/identity/) or [Facebook](https://developers.facebook.com/docs/facebook-login)) 
into one sophisticated solution. Read [more](http://ukey.one/).

### Ukey1 flow for this NodeJS SDK

1. User clicks to "sign-in" button
  - you may use our [unified sign-in button](https://github.com/asaritech/ukey1-signin-button)
2. SDK sends a connection request to our API and gets a unique Gateway URL
3. User is redirected to Ukey1 Gateway
4. User signs in using their favourite solution and authorizes your app
5. User is redirected back to predefined URL
6. SDK checks the result and gets a unique access token
7. That's it - user is authenticated (your app can make API calls to get user's data)

### RAML API specification

You can also download our [API specification](https://ukey1.nooledge.com/var/public/api.raml) in [RAML format](http://raml.org/).

## Requirements

## Installation

## Usage

First, you need your app credentials (`App ID` and `Secret Key`). 

### Sign-in / sign-up / log-in - all buttons in one

Your app may look like this:

```html
<html>
  <head>
    <!-- ... -->
    <link rel="stylesheet" type="text/css" href="https://gitcdn.xyz/repo/asaritech/ukey1-signin-button/master/css/ukey1-button.min.css" media="screen">
  </head>
  <body>
    <!-- ... -->
    <a href="/login" class="ukey1-button">Sign in via Ukey1</a>
    <!-- ... -->
  </body>
</html>
```

### Connection request

First, you need to make a request to our endpoint `/auth/connect` to get Gateway URL. Then redirect user to that URL.

### Requests for access token and user details

Once the user authorizes your app, Ukey1 redirects the user back to your app to the URL you specified earlier. 
The same is done if user cancels the request.

URL will look like this: `http://example.org/login.php?action=check&user=XXX&_ukey1[request_id]={REQUEST_ID}&_ukey1[connect_id]={CONNECT_ID}&_ukey1[result]={RESULT}&_ukey1[signature]={SIGNATURE}#fragment` 
where `REQUEST_ID` is previously used `$requestId`, `CONNECT_ID` is previously used `$connectId`, `RESULT` may be *authorized*, *canceled* or *expired* and 
`SIGNATURE` is a security signature.

## Example



## License

This code is released under the MIT license. Please see [LICENSE](https://github.com/asaritech/ukey1-php-sdk/blob/master/LICENSE) file for details.

## Contributing

If you want to become a contributor of this NodeJS SDK, please first contact us (see our email below). 
If you would like to work on another SDK (in your favorite language), we will glad to know about you too!

## Contact

Reporting of any [issues](https://github.com/asaritech/ukey1-php-sdk/issues) are appreciated. 
If you want to contribute or you have a critical security issue, please write us directly to [developers@asaritech.com](mailto:developers@asaritech.com).