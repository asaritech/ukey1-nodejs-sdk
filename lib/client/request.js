'use strict';

var bcrypt = require('bcrypt-nodejs');
var request = require("request");
var Result = require("./result");

const TIMEOUT = 10000;
const USER_AGENT = 'ukey1-nodejs-sdk/';

function Request() {
    this.options = {};
}

Request.prototype.checkOptions = function() {
    if (typeof this.options === 'object') {
        if (!this.options.appId || typeof this.options.appId !== 'string') {
            throw new Error('Unknown/invalid `options.appId` (string)');
        }
        
        if (!this.options.secretKey || typeof this.options.secretKey !== 'string') {
            throw new Error('Unknown/invalid `options.secretKey` (string)');
        }
        
        if (!this.options.host || typeof this.options.host !== 'string') {
            throw new Error('Unknown/invalid `options.host` (string)');
        }
        
        if (!this.options.sdkVersion || typeof this.options.sdkVersion !== 'string') {
            throw new Error('Unknown/invalid `options.sdkVersion` (string)');
        }
        
        if (!this.options.apiVersion || typeof this.options.apiVersion !== 'string') {
            throw new Error('Unknown/invalid `options.apiVersion` (string)');
        }
        
        if (this.options.method !== 'GET' && this.options.method !== 'POST') {
            throw new Error('Unknown/invalid `options.method` (string)');
        }
        
        if (!this.options.endpoint || typeof this.options.endpoint !== 'string') {
            throw new Error('Unknown/invalid `options.endpoint` (string)');
        }
        
        if (this.options.accessToken && typeof this.options.accessToken !== 'string') {
            throw new Error('Unknown/invalid `options.accessToken` (string)');
        }
    }
    else {
        throw new Error('Unknown/invalid `options` (object)');
    }
};

Request.prototype.createJsonBody = function(body) {
    if (body && this.options.method !== 'GET') {
        return JSON.stringify(body);
    }
    
    return '';
};

Request.prototype.createSignature = function(json) {
    let password = this.options.apiVersion
        + this.options.endpoint
        + this.options.method
        + this.options.appId
        + this.options.secretKey;

    if (json) {
        password += json;
    }
    
    if (this.options.accessToken) {
        password += this.options.accessToken;
    }
    
    return bcrypt.hashSync(password);
};

Request.prototype.prepareHeaders = function(signature, headers) {
    headers['User-Agent'] = this.prepareUserAgent();
    headers['x-ukey1-app'] = this.options.appId;
    headers['x-ukey1-signature'] = signature;
    
    if (this.options.accessToken) {
        headers['Authorization'] = 'UKEY1 ' + this.options.accessToken;
    }
    
    return headers;
};

Request.prototype.prepareUserAgent = function() {
    return USER_AGENT + this.options.sdkVersion + ' Node.js/' + process.version.slice(1);
};

Request.prototype.setOptions = function(options) {
    this.options = options;
};

Request.prototype.setMethod = function(method) {
    this.options.method = method;
};

Request.prototype.setEndpoint = function(endpoint) {
    this.options.endpoint = endpoint;
};

Request.prototype.setAccessToken = function(accessToken) {
    this.options.accessToken = accessToken;
};

Request.prototype.send = function(body, callback) {
    this.checkOptions();
    
    let json = this.createJsonBody(body);
    let signature = this.createSignature(json);
    let options = {}, headers = {};
    
    headers = this.prepareHeaders(signature, headers);
    options.url = this.options.host + this.options.apiVersion + this.options.endpoint;
    options.method = this.options.method;
    options.json = true;
    options.timeout = TIMEOUT;
    
    if (body) {
        headers['Content-Type'] = 'application/json';
        headers['Content-Length'] = json.length;
        options.body = body;
    }
    
    options.headers = headers;
    
    request(options, function(error, response, body) {
        if (error) {
            if (error.connect === true) {
                throw new Error('Connection timeout');
            }
            
            console.error(error, response);
            throw new Error('An error was occured');
        }
        
        new Result(response, body, callback);
    });
};

module.exports = Request;