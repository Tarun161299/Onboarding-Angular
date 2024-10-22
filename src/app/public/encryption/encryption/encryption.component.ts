import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit(): void {
    //this._keydata='11e6e89555d0e78beb62260b56e7d8f8033da42cb37291046bce2cd4445c01a1'

  }
  name = 'Angular';
  public _key: CryptoKey;
  public _keydata: JsonWebKey | ArrayBuffer;

  choices = ['jwk', 'raw'];
  defaultChoice: 'jwk' | 'raw' = 'jwk';
  groupName = 'exportType';
  currentChoice = 'jwk';

  importString: string;
  importError = false;

  encrypted = false;
  dataToEncrypt: string;
  encryptedData: string;
  initVector: any;
  encryptionError = false;

  decrypted = false;
  dataToDecrypt: string;
  decryptedData: string;
  decryptionError = false;

  choose(e) {
    this.clear();
    this.currentChoice = e;
  }

  clear() {
    this._keydata = null;
    this._key = null;
    this.importError = false;
    this.encrypted = false;
    this.encryptionError = false;
    this.decrypted = false;
    this.decryptionError = false;
  }


  importRawKey(rawKeyString: string) {

    if (!rawKeyString) {
      console.error('Invalid rawKeyString');
      return;
    }

    // Convert rawKeyString to ArrayBuffer
    const keyArrayBuffer = this.convertKeyStringToRaw(rawKeyString);

    // Import the raw key
    window.crypto.subtle.importKey(
      'raw',
      keyArrayBuffer,
      { name: "AES-GCM", length: 256 },
      true, // Extractable
      ["encrypt", "decrypt"]
    )
      .then((importedKey) => {
        this._key = importedKey;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  convertKeyStringToRaw(keyString: string): ArrayBuffer {
    // Implement your conversion logic (e.g., from hexadecimal string to ArrayBuffer)
    // Example: Convert a hexadecimal string to ArrayBuffer
    const bytes = keyString.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
    return new Uint8Array(bytes).buffer;
  }


  buf2hex(buffer: ArrayBuffer): string {
    
    const keyString = Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    return keyString;
  }

  hex2buf(hex: string): ArrayBuffer {
    return new Uint8Array(hex.match(/.{1,2}/g).map(val => parseInt('0x' + val))).buffer;
  }

  ab2str(buf: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  str2ab(str: string): ArrayBuffer {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  // encrypt(data: string): void {
  //   this.importRawKey('11e6e89555d0e78beb62260b56e7d8f8033da42cb37291046bce2cd4445c01a1')
  //   
  //   this.encryptionError = false;
  //   if (!data) {
  //     this.encryptionError = true;
  //     return;
  //   }
  //   this.initVector = window.crypto.getRandomValues(new Uint8Array(16))
  //   window.crypto.subtle.encrypt(
  //     {
  //       name: "AES-GCM",

  //       iv: this.initVector,

  //       tagLength: 128,
  //     },
  //     this._key, //from generateKey or importKey above
  //     this.str2ab(data)
  //   )
  //     .then((encrypted) => {
  //       
  //       //// KD this.encryptedData = this.buf2hex(this.initVector) + '|' + this.buf2hex(encrypted);
  //       this.encryptedData = this.buf2hex(this.initVector) + this.buf2hex(encrypted);
  //       //  console.log(this.encryptedData+'Data')
  //       this.dataToDecrypt = this.encryptedData;
  //       this.encrypted = true;
  //     })
  //     .catch(function (err) {
  //       this.encrypted = true;
  //       this.encryptionError = true;
  //     });
  // }


  // encrypt(data: string): any {
  //   this.importRawKey('11e6e89555d0e78beb62260b56e7d8f8033da42cb37291046bce2cd4445c01a1')
  //   const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
  //   const encoder = new TextEncoder();
  //   const encodedData = encoder.encode(data);

  //   const cipher = crypto.subtle.encrypt(
  //     {
  //       name: 'AES-GCM',
  //       iv: iv,
  //     },
  //     this._key,
  //     encodedData
  //   );

  //   return Promise.all([cipher]).then(([cipherArrayBuffer]) => {
  //     const encryptedArray = new Uint8Array(cipherArrayBuffer);
  //     const resultArray = new Uint8Array(iv.length + encryptedArray.length);
  //     resultArray.set(iv, 0);
  //     resultArray.set(encryptedArray, iv.length);
  //     let darta= btoa(String.fromCharCode.apply(null, resultArray));
  //     this.dataToDecrypt = darta;
  //     this.encrypted = true;
  //   });
  // }


  // async encryptData(plainText: string): Promise<string> {
  //   try {
  //     const key = await crypto.subtle.generateKey(
  //       { name: 'AES-GCM', length: 256 },
  //       true,
  //       ['encrypt', 'decrypt']
  //     );

  //     const iv = crypto.getRandomValues(new Uint8Array(12));
  //     const plainBytes = new TextEncoder().encode(plainText);

  //     const encryptedBuffer = await crypto.subtle.encrypt(
  //       { name: 'AES-GCM', iv: iv },
  //       key,
  //       plainBytes
  //     );

  //     const encryptedBytes = new Uint8Array(encryptedBuffer);
  //     const encryptedString = btoa(String.fromCharCode(...encryptedBytes));

  //     return encryptedString;
  //   } catch (error) {
  //     console.error('Encryption error:', error);
  //     throw error; // Handle the error appropriately in your application
  //   }
  // }

  encrypt(data: string): any {

const keyHex = '0123456789ABCDEF0123456789ABCDEF';
const nonceHex='0123456789AB';
const key = this.hexStringToUint8Array(keyHex);
const nonce = this.hexStringToUint8Array(nonceHex);
    this.encryptAesGcm(data,nonce)
  }
   hexStringToUint8Array(hexString: string): Uint8Array {
    const bytes = new Uint8Array(hexString.length / 2);

    for (let i = 0; i < hexString.length; i += 2) {
        bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
    }

    return bytes;
}

  async  encryptAesGcm(plaintext: string, nonce: Uint8Array): Promise<Uint8Array> {
    this.importRawKey('0123456789ABCDEF0123456789ABCDEF')
    const encodedText = new TextEncoder().encode(plaintext);
    const subtleCrypto = window.crypto.subtle;

    const encryptedBuffer = await subtleCrypto.encrypt(
        {
            name: 'AES-GCM',
            iv: nonce,
        },
        this._key,
        encodedText
    );

    let ab= new Uint8Array(encryptedBuffer);
    this.dataToDecrypt = new Uint8Array(encryptedBuffer).toString();
    this.encrypted = true;
    return ab;
}
  // decrypt(data: string): void {
  //   this.importRawKey('11e6e89555d0e78beb62260b56e7d8f8033da42cb37291046bce2cd4445c01a1')
  //   this.decryptionError = false;
  //   if (!data) {
  //     this.decryptionError = true;
  //     return;
  //   }
  //   //// DK const tmp = data.split('|');
  //   
  //   const iIV = data.substring(0,32);
  //   const encData = data.substring(32);
  //   // if (tmp.length < 2) {
  //   //   this.decryptionError = true;
  //   //   return;
  //   // }
  //   window.crypto.subtle.decrypt(
  //     {
  //       name: "AES-GCM",
  //       //// DK //iv: this.hex2buf(tmp[0]), //The initialization vector you used to encrypt
  //       iv: this.hex2buf(iIV), //The initialization vector you used to encrypt
  //       //additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
  //       tagLength: 128, //The tagLength you used to encrypt (if any)
  //     },
  //     this._key, //from generateKey or importKey above
  //     //// DK this.hex2buf(tmp[1]) //ArrayBuffer of the data
  //     this.hex2buf(encData) //ArrayBuffer of the data
  //   )
  //     .then((decrypted) => {
  //       //returns an ArrayBuffer containing the decrypted data
  //       this.decryptedData = this.ab2str(decrypted);
  //       this.decrypted = true;
  //     })
  //     .catch((err) => {
  //       this.decrypted = true;
  //       this.decryptionError = true;
  //     });
  // }
  decrypt(encryptedData: string): Promise<any> {
    this.importRawKey('11e6e89555d0e78beb62260b56e7d8f8033da42cb37291046bce2cd4445c01a1')
    const uint8ArrayData = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    const iv = uint8ArrayData.slice(0, 12);
    const ciphertext = uint8ArrayData.slice(12);

    return crypto.subtle
      .decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        this._key,
        ciphertext
      )
      .then((decryptedArrayBuffer) => {
        const decoder = new TextDecoder();
        let de= decoder.decode(decryptedArrayBuffer);
            this.decryptedData = de;
        this.decrypted = true;
      });
  }


  //#region  (This Code Use For Generate Only Key)
  generateKey() {
    
    let keyType;
    keyType = 'raw'
    window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256, //can be 128, 192, or 256
      },
      true, //whether the key is extractable (i.e., can be used in exportKey)
      ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
      .then((key) => {
        // returns a key object
        this._key = key;
        return this.exportKey(keyType);
      })
      .catch((err) => {
        console.error(err);
      });

  }

  getKeyJson(jsonOrArray: any): any {
    
    let en = this.buf2hex(jsonOrArray);
    return;
    ///return '11e6e89555d0e78beb62260b56e7d8f8033da42cb37291046bce2cd4445c01a1'
  }

  exportKey(keyType: 'raw') {

    window.crypto.subtle.exportKey(keyType, this._key //extractable must be true
    )
      .then((keydata) => {
        //returns the exported key data
        
        this._keydata = keydata
      })
      .catch(function (err) {
        console.error(err);
      });


  }
  //#endregion (This Code Use For Generate Only Key)
}

