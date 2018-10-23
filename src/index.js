'use strict'

const uuidv1 = require('uuid/v1');
const request = require('request-promise');
const crypto = require('crypto');
const EOL = require('os').EOL;

const BASE_URL = 'https://api.ukey.one';

const prepareEndpointUrl = function(endpoint) {
  return BASE_URL + endpoint;
};

const prepareSecretKey = function(secretKey) {
  return '-----BEGIN PUBLIC KEY-----' + EOL + secretKey.match(new RegExp('.{0,64}', 'g')).join(EOL) + '-----END PUBLIC KEY-----';
};

class Ukey1 {
  constructor(appId, secretKey, origin) {
    this.appId = appId;
    this.secretKey = prepareSecretKey(secretKey);
    this.origin = origin;
  }

  async makeRequest(endpoint, method, headers, body) {
    let res;

    try {
      res = await request({
        method: method,
        uri: prepareEndpointUrl(endpoint),
        body: body,
        headers: headers
      });
      res = JSON.parse(res);
    }
    catch (err) {
      res = err.error ? JSON.parse(err.error) : { result: 500, debug: { code: null, message: 'Invalid response' } };
    }

    return res;
  }

  prepareHeaders(signature, accessToken) {
    let obj = {
      'X-Ukey1-App': this.appId,
      'X-Origin': this.origin,
      'X-Ukey1-Signature': signature,
      'User-Agent': 'Ukey1-NodeJS-SDK/' + process.env.npm_package_version + (process.env.npm_config_user_agent ? ' ' + process.env.npm_config_user_agent : '')
    };

    if (accessToken) {
      obj['Authorization'] = 'Bearer ' + accessToken;
    }

    return obj;
  }

  prepareBody(obj) {
    return JSON.stringify(obj);
  }

  prepareSignature(endpoint, method, body, accessToken) {
    let str = this.appId + method + endpoint;

    if (body) {
      str += body;
    }

    if (accessToken) {
      str += accessToken;
    }

    const hash = crypto.createHash('sha512');
    hash.update(str);
    const digest = hash.digest('hex');
    const encrypted = crypto.publicEncrypt({ key: this.secretKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, Buffer.from(digest));

    return encodeURIComponent(encrypted.toString('base64'));
  }

  async connect(options) {
    const endpoint = '/auth/v2/connect';
    const method = 'POST';
    let requestId, scope, returnUrl, headers, body;

    if (!options) {
      options = {};
    }

    requestId = options.requestId || uuidv1();
    scope = options.scope || [];
    returnUrl = options.returnUrl || '';

    if (!returnUrl) {
      throw new Error('Unspecified return URL');
    }

    body = this.prepareBody({
      request_id: requestId,
      scope: scope,
      return_url: returnUrl
    });
    headers = this.prepareHeaders(this.prepareSignature(endpoint, method, body), null);

    return await this.makeRequest(endpoint, method, headers, body);
  }
}

module.exports = Ukey1;
