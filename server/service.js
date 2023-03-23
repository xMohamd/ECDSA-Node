const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex,utf8ToBytes } = require("ethereum-cryptography/utils");

function extractPublicKey(fullKey){
    let kec = keccak256(fullKey.slice(1, fullKey.length));
    return toHex(kec.slice(kec.length - 20, kec.length));
}

function verifySignature(sign,msg,pubKey){
    const msgHash = keccak256(utf8ToBytes(msg));
    let actualSignature = sig.slice(0,sig.length - 1);
    let recoveryBit = parseInt(sig[sig.length - 1]);
    const sigPubKey = secp.recoverPublicKey(msgHash,actualSignature,recoveryBit);
    const mainKey = extractPublicKey(sigPubKey);
    return mainKey == pubKey;
}

module.exports = {
    verifySignature,
    extractPublicKey
}