'use strict';

function Result(response, body, callback) {
    this.response = response;
    this.body = body;
    this.status = response.statusCode;
    
    callback(this);
}

Result.prototype.getData = function() {
    if (!this.body.result) {
        console.error(this.body);
        throw new Error('Invalid response structure');
    }
    
    this.checkStatus(this.body.result);
    
    return this.body;
};

Result.prototype.checkStatus = function(expectedStatus) {
    if (expectedStatus !== this.response.statusCode) {
        throw new Error('Unexpected HTTP status ' + this.response.statusCode);
    }
};

Result.prototype.getStatus = function() {
    return this.response.statusCode;
};

module.exports = Result;