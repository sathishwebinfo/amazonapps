import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  registerForm = this._builder.group({
    id: this._builder.control('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])),
    name: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')
    ])),
    email: this._builder.control('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    gender: this._builder.control('male'),
    role: this._builder.control(''),
    isActive: this._builder.control(false)
  });
  proceedRegistration() {
    if (this.registerForm.valid) {
      this._service.proceedRegister(this.registerForm.value).subscribe(res => {
        this._toastr.success('Please contact admin for enable access', 'Registered Successfully');
        this.router.navigate(['login']);
      });
    } else {
      this._toastr.warning('Please enter valid data');
    }
  }
}
