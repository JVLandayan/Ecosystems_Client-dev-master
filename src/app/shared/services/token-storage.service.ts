import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear()
  }

  public save_token(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY)
  }

  public get_token():string {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  public save_user(user):void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public get_user():any{
    return JSON.parse(sessionStorage.getItem(USER_KEY))
  }

}
