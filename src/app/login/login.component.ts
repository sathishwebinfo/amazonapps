import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any;
  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _service: AuthService,
    private router: Router
  ) { 
    sessionStorage.clear();
  }
  ngOnInit(): void {

  }
  loginForm = this._builder.group({
    username: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required),
  });
  proceedLogin() {
    if (this.loginForm.valid) {
      //   this._service.proceedRegister(this.registerForm.value).subscribe(res => {
      //     this._toastr.success('Please contact admin for enable access', 'Registered Successfully');
      //     this.router.navigate(['login']);
      //   });
      // } else {
      //   this._toastr.warning('Please enter valid data');
      this._service.getByCode(this.loginForm.value.username).subscribe(res => {
        this.userData = res;
        console.log(this.userData);
        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('userrole', this.userData.role);
            this.router.navigate(['']);
          } else {
            this._toastr.error('Please contact Admin', 'In Active User');
          }
        } else {
          this._toastr.error('Invalid Credential');
        }
      })
    }
  }
}
