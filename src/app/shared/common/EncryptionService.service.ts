import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { cipher, util, random, hmac, pkcs5 } from "node-forge";

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
    // private secretKey = 's1L2a3S4h';
    // generateMac(message: string): string {
    //     const mac = CryptoJS.HmacSHA256(message, this.secretKey);
    //     return CryptoJS.enc.Base64.stringify(mac);
    //   }
    //   verifyHMAC(message: string, receivedHMAC: string, secretKey: string): boolean {
    //     const calculatedHMAC = this.generateMac(message);
    //     return calculatedHMAC === receivedHMAC;
    //   }

  encodedEncryptedData:string='';
  authenticatedTag;
  encryptedOutput;
  associatedData = "0f3f056e5a7a4a4f3a82a1034b283c6e";
  name = "{username:sdlfjsd;password:sdfsdfdd}";
  encrypt = this.encryptData(this.name);
  decrypt = this.decryptData(this.encodedEncryptedData);

  get data() {
    return {
      origin: this.name,
      encrypt: this.encrypt
    };
  }

  encryptData(plainText: string): any {

    let secretKey = "f0ae60f1adcd4f28e89189689cbe3afe";
    let iv = random.getBytesSync(12);

    let hmacSha1 = hmac.create();
    hmacSha1.start("sha1", secretKey);
    hmacSha1.update(plainText);

    let salt = random.getBytesSync(16);
    let derivedKey = pkcs5.pbkdf2(secretKey, salt, 65536, 16);
    const cipherGCM = cipher.createCipher("AES-GCM", derivedKey);
    cipherGCM.start({
      iv: iv, // should be a 12-byte binary-encoded string or byte buffer
      additionalData: this.associatedData, // optional
      tagLength: 128 // optional, defaults to 128 bits
    });
    cipherGCM.update(util.createBuffer(random.getBytes(16)));
    cipherGCM.finish();

    this.authenticatedTag = cipherGCM.mode.tag;

    this.encodedEncryptedData = util.encode64(cipherGCM.output.getBytes());

    this.encryptedOutput = cipherGCM.output;
  }
  decryptData(encryptedText: string): any {
    let decodedData = util.decode64(encryptedText);
    let associatedData = "0f3f056e5a7a4a4f3a82a1034b283c6e";
    let secretKey = "f0ae60f1adcd4f28e89189689cbe3afe";

    let iv = random.getBytesSync(12);

    let hmacSha1 = hmac.create();
    hmacSha1.start("sha1", secretKey);
    hmacSha1.update(decodedData);

    let salt = random.getBytesSync(16);
    let derivedKey = pkcs5.pbkdf2(secretKey, salt, 65536, 16);

    let decipher = cipher.createDecipher("AES-GCM", derivedKey);
    decipher.start({
      iv: iv,
      additionalData: this.associatedData, // optional
      tagLength: 128, // optional, defaults to 128 bits
      tag: this.authenticatedTag // authentication tag from encryption
    });
    decipher.update(this.encryptedOutput);
  }
}
