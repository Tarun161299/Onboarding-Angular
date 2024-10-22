import { Injectable } from '@angular/core';
@Injectable()
export class TokenLocalStorageService {
  constructor() { }
  public set(key: string, value: string) {
    if (key == 'token' || key == 'refreshToken')  {
      localStorage.setItem(key, value);
    }
    else {
      localStorage.setItem(key, btoa(value).toString());
    }
  }
  public get(key: string) {
    if(key=='token'||key=='refreshToken'){
      return localStorage.getItem(key);
      }
      else{
          return atob(localStorage.getItem(key));
    }
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }

  public ParseToken(){
    if(localStorage.getItem('token')==null)return null
    else
    return (JSON.parse(atob((localStorage.getItem('token')).split('.')[1])))
   }
}