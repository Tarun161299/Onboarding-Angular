import * as CryptoJS from 'crypto-js'
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';
import { ConfigurationApiSecureKey } from '../services/ConfigurationApiSecureKey.Services';

export class EncyptionDecryption{
  stringToBeHashed:string;
  EncryptedValue:any;
  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string | undefined;
  request: string | undefined;
  responce: string | undefined;
    static decrypted: string;
    //encryptDecrypt:ConfigurationApiSecureKey;
    encryptionError = false;
    initVector: any;
    encryptedData: string;
    public _key: CryptoKey;
    dataToDecrypt:any;
  

     public static Encrypt(value: string ,secretKey:string,salt:string): string {
      
         let _key = CryptoJS.enc.Utf8.parse(secretKey) 
         let _iv = CryptoJS.enc.Utf8.parse(salt)
         let encrypted = CryptoJS.AES.encrypt(value, _key, {
           iv: _iv,
           mode: CryptoJS.mode.CBC,
         }).toString().replace(/\//g,'s1L2a3S4h');
         return encrypted;
      
       }
      public static Decrypt(value: string,decsecretKey:string,decsalt:string): string {
        let _key = CryptoJS.enc.Utf8.parse(decsecretKey);
        let _iv = CryptoJS.enc.Utf8.parse(decsalt);
        value=value.replace(/s1L2a3S4h/g, '/')
        let decrypt = CryptoJS.AES.decrypt(value, _key, {
          iv: _iv,
          mode: CryptoJS.mode.CBC,
        }).toString(CryptoJS.enc.Utf8);
        return decrypt;
      }
      
      public encryptionAES(data: string): void {
        
        this.encryptionError = false;
        if (!data) {
          this.encryptionError = true;
          return;
        }
        this.initVector = window.crypto.getRandomValues(new Uint8Array(12))
        window.crypto.subtle.encrypt(
          {
            name: "AES-GCM",
    
            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: this.initVector,
    
            //Additional authentication data (optional)
            // additionalData: ArrayBuffer,
    
            //Tag length (optional)
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
          },
          this._key, //from generateKey or importKey above
          this.str2ab(data) //ArrayBuffer of data you want to encrypt
        )
          .then((encrypted) => {
            //returns an ArrayBuffer containing the encrypted data
            this.encryptedData = this.buf2hex(this.initVector) + '|' + this.buf2hex(encrypted);
            this.dataToDecrypt = this.encryptedData;
            this.encrypted = true;
          })
          .catch(function (err) {
            this.encrypted = true;
            this.encryptionError = true;
          });
      }
    
      str2ab(str: string): ArrayBuffer {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
      }
      buf2hex(buffer: ArrayBuffer): string {
        return Array
          .from(new Uint8Array(buffer))
          .map(b => b.toString(16).padStart(2, "0"))
          .join("");
      }
      
     
}