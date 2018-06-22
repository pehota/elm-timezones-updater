const { promisify } = require('util');
const fs = require('fs');
const { getArgs } = require('./util');
const args = getArgs();

if (!('file' in args) && !('dir' in args)) {
  throw new Error('Error: Neither file nor dir arguments provided');
}

console.log('finish up file loading');
