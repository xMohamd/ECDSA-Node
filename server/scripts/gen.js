const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { extractPublicKey } = require("../service");

let privateKey = secp.utils.randomPrivateKey();
let pubKey = secp.getPublicKey(privateKey);

pubKey = extractPublicKey(pubKey);

console.log("Private Key:", toHex(privateKey));
console.log("Public Key:", pubKey);