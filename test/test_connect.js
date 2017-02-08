'use strict';

var ukey1 = require("../lib/ukey1");
var requestId = ukey1.randomString();
var options = {
    appId: '',
    secretKey: '',
    requestId: requestId,
    returnUrl: '',
    scope: ['access_token']
};

var connect = ukey1.connect(options);
connect.execute(function(data) {
    console.log('Request ID', requestId);
    console.log('Connect ID', data.connect_id);
    console.log('Gateway URL', data.gateway.url);
});