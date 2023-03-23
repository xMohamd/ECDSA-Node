const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { hide } = require('yargs');

let args = yargs(hideBin(process.argv))
    .option('private_key', {
        alias: 'p',
        type:'string',
        description: 'Your Private Key',
        demanOption: true
    })
    .option('data',{
        alias: 'd',
        type: 'string',
        description: 'Payload to sign',
        demanOption: true
    })
    .parse()

    let privKey = args.private_key;
    let msgHash = args.data;

    secp.sign(secp.utils.hexToBytes(msgHash), privKey, {recovered: true})
        .then(
          data => {
            const [signature , recovery_bit] = data;
            let sig = toHex(signature);
            console.log("Your Signature:", sig);
            console.log("Your Recovery Bit:", recovery_bit);
            let fullSig = sig + recovery_bit.toString();
            console.log("Copy and paste this as the full signature, this has the recovery bit attached to the end:\n", fullSig);
          }  
        )