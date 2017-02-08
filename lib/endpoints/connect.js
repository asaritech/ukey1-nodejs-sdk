'use strict';

var Request = require("../client/request");

const ENDPOINT = '/auth/connect';

function Connect(options) {
    this.options = options;
    
    if (!options.requestId || typeof options.requestId !== 'string') {
        throw new Error('Unknown/invalid `options.requestId` (string)');
    }
    
    if (!options.returnUrl || typeof options.returnUrl !== 'string') {
        throw new Error('Unknown/invalid `options.returnUrl` (string)');
    }
    
    if (options.scope && Object.prototype.toString.call(options.scope) !== '[object Array]') {
        throw new Error('Unknown/invalid `options.scope` (array)');
    }
}

Connect.prototype.execute = function(callback) {
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
        throw new Error('Unknown/invalid `callback` (function)');
    }
    
    let r = new Request();
    r.setOptions(this.options);
    r.setMethod('POST');
    r.setEndpoint(ENDPOINT);
    r.send({
        request_id: this.options.requestId,
        scope: this.options.scope,
        return_url: this.options.returnUrl
    }, function(result) {
        if (result.getStatus() === 200) {
            callback(result.getData());
        }
        else {
            throw new Error(result.getData().debug.message);
        }
    });
};

module.exports = Connect;