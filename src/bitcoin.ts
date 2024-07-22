import ECPairFactory from "ecpair";
//import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";
import { generate_address_from_priv } from "./wasm-bitcoin/wasm";

const ECPair = ECPairFactory(ecc);

export const random32Byte = () => {
  if (typeof window === "object" && typeof document === "object") {
    /**
     * If the user is using a Browser
     */
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);

    let hexString = "";
    for (let i = 0; i < randomBytes.length; i++) {
      hexString += randomBytes[i].toString(16).padStart(2, "0");
    }
    return hexString;
  } else if (typeof process !== "undefined" && process.versions != null) {
    throw new Error("don't use it on Node.js");
  }
};

export const random32ByteRange = (min: string, max: string) => {
  const bmin = BigInt("0x" + min);
  const bmax = BigInt("0x" + max);

  const range = bmax - bmin;
  const random = random32Byte(); // this generates the 32 byte number
  const brandom = BigInt("0x" + random);

  const result = bmin + (brandom % range);
  return result.toString(16);
};

export const findPrivateKey = async (start: string, goalAddress: string) => {
  let privateKey = BigInt("0x" + start);
  for (let i = 0; i < 50000; i++) {
    const resultAddres = generate_address_from_priv(privateKey.toString(16));
    //console.log(result);
    if (resultAddres === goalAddress)
      return {
        success: true,
        privateKey,
      };

    privateKey++;
  }

  return {
    success: false,
    address: "",
  };
};

export const toWIF = (privCoin: string) => {
  const wif = ECPair.fromPrivateKey(Buffer.from(privCoin, "hex")).toWIF();
  return wif;
};
