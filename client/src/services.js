import { keccak256 } from 'ethereum-cryptography/keccak'
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils"

export async function hashMessage(message){
    return toHex(keccak256(utf8ToBytes(message)));
}
