import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  apiUrl = "http://localhost:3000/user";

  getAll() {
    return this._http.get(this.apiUrl);
  }
  getAllRole(){
    return this._http.get("http://localhost:3000/role");
  }
  getByCode(code: any) {
    return this._http.get(this.apiUrl + '/' + code)
  }
  proceedRegister(inputdata: any) {
    return this._http.post(this.apiUrl, inputdata);
  }
  updateUser(code: any, inputdata: any) {
    return this._http.put(this.apiUrl + '/' + code, inputdata)
  }
  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  getUserRole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }
}
