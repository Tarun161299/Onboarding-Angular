import { Injectable } from '@angular/core';
import * as crypto from 'crypto';

@Injectable({
    providedIn: 'root',
})
export class EncryptDecryptOm {


     encrypt(message: string): { encrypted: string; KEY: string; IV: string; TAG: string } {
        
        const KEY = crypto.randomBytes(32);
        const IV = crypto.randomBytes(16);
        const ALGORITHM = 'aes-256-gcm';
      
        const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const tag = cipher.getAuthTag();
      
        const output = {
          encrypted,
          KEY: KEY.toString('hex'),
          IV: IV.toString('hex'),
          TAG: tag.toString('hex'),
        };
      
        return output;
      }

    decrypt() {
        let KEY = crypto.randomBytes(32);//this.hexStringToArrayBuffer(data.KEY);
        let IV = crypto.randomBytes(16);//this.hexStringToArrayBuffer(data.IV);
        let encrypted = this.hexStringToArrayBuffer(KEY);

        window.crypto.subtle.importKey('raw', KEY, 'AES-GCM', true, ['decrypt']).then((importedKey) => {
            window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: IV,
                },
                importedKey,
                encrypted
            ).then((decodedBuffer) => {
                let plaintext = new TextDecoder('utf8').decode(decodedBuffer);
            })
        })
    }
    hexStringToArrayBuffer(hexString) {
        hexString = hexString.replace(/^0x/, '');
        if (hexString.length % 2 != 0) {
        }
        var bad = hexString.match(/[G-Z\s]/i);
        if (bad) {
        }
        var pairs = hexString.match(/[\dA-F]{2}/gi);
        var integers = pairs.map(function (s) {
            return parseInt(s, 16);
        });
        var array = new Uint8Array(integers);
        return array.buffer;
    }
}
