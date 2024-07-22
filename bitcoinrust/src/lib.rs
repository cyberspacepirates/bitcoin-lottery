use bitcoin::secp256k1::SecretKey;
use bitcoin::PrivateKey;
use wasm_bindgen::prelude::*;
use bitcoin::key::Secp256k1;
use bitcoin::Address;
use bitcoin::Network;

#[wasm_bindgen]
pub fn generate_address_from_priv(priv_key: &str) -> String {
    // // Generate A p2pkh address from the private key hex
    let padded = format!("{:0>64}", priv_key);
    let priv_key_hex = hex::decode(padded).unwrap();
    //let priv_key_hex = hex_to_bytes(&priv_key); // turns the hex into bytes

    let secp = Secp256k1::new();
    let secret_key = SecretKey::from_slice(&priv_key_hex).unwrap(); // from that private key finds the 2 points
    let myprivate_key = PrivateKey::new(secret_key, Network::Bitcoin);
    let mypublic_key = myprivate_key.public_key(&secp);
    let addr = Address::p2pkh(&mypublic_key, bitcoin::Network::Bitcoin);
    addr.to_string() // Returns the address as string
}