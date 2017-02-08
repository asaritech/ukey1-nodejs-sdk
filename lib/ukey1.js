'use strict';

var randomstring = require('randomstring');
var Connect = require('./endpoints/connect');
/*var AccessToken = require('./endpoints/accessToken');
var RefreshToken = require('./endpoints/refreshToken');
var User = require('./endpoints/user');*/

const sdkVersion = '1.0.0';
const apiVersion = '/v1';
const host = 'https://ukey1-api.nooledge.com';

function checkOptions(options) {
    if (typeof options === 'object') {
        if (!options.appId || typeof options.appId !== 'string') {
            throw new Error('Unknown/invalid `options.appId` (string)');
        }
        
        if (!options.secretKey || typeof options.secretKey !== 'string') {
            throw new Error('Unknown/invalid `options.secretKey` (string)');
        }
        
        options.sdkVersion = sdkVersion;
        options.apiVersion = apiVersion;
        
        if (!options.host) {
            options.host = host;
        }
    }
    else {
        throw new Error('Unknown/invalid `options` (object)');
    }
    
    return options;
}

exports.randomString = function() {
    return randomstring.generate();
};

exports.connect = function(options) {
    return new Connect(checkOptions(options));
};

/*exports.accessToken = function(options) {
    return new AccessToken(checkOptions(options));
};

exports.refreshToken = function(options) {
    return new RefreshToken(checkOptions(options));
};

exports.user = function(options) {
    return new User(checkOptions(options));
};*/