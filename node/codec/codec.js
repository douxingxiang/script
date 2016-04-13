/* jshint node: true */
'use strict';

var codec = {}
//url encode and decode
//http://stackoverflow.com/questions/6554039/how-do-i-url-encode-something-in-node-js
codec.decodeUrl = function(url) {
    //encodeURIComponent会编码/:?
    //encodeURI 不会
    return decodeURIComponent(url);
}

codec.encodeUrl = function(str) {
    return encodeURIComponent(str);
}

//base64 encode and decode
//http://www.cnblogs.com/nano/archive/2013/05/27/3101348.html
codec.decodeBase64 = function(bsStr) {
    return new Buffer(bsStr, 'base64').toString();
}

codec.encodeBase64 = function(str) {
    return new Buffer(str).toString('base64')
};

//hex encode and decode
codec.decodeHex = function(bsStr) {
    //return int.toString();
    return new Buffer(bsStr, 'hex')
}

codec.encodeHex = function(str) {
    //return int.toString(16); 
    return new Buffer(str).toString('hex')
};

console.log(codec.decodeHex('aaaa'));
console.log(codec.encodeHex('293479217349'));
module.exports = codec;