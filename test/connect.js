const http = require('http');
const Ukey1 = require('../src/index');

const KEY = '';
const SECRET = '';
const ORIGIN = '';

async function testConnect() {
  if (KEY && SECRET && ORIGIN) {
    const uk1 = new Ukey1(KEY, SECRET, ORIGIN);
    const output = await uk1.connect({
      requestId: '1540324797410',
      scope: ['email!'],
      returnUrl: ORIGIN + '/return'
    });

    console.log(output, '\n');
  } else {
    console.error('No test configuration');
  }
}

testConnect();
