import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit {
  roleList: any;
  constructor(
    private _builder: FormBuilder,
    private _service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _toastr: ToastrService,
    private _dialog: MatDialogRef<UpdatepopupComponent>
  ) { }
  editdata: any;
  ngOnInit(): void {
    this._service.getAllRole().subscribe(res => {
      this.roleList = res;
    })
    if(this.data.usercode!=null && this.data.usercode!=''){
      this._service.getByCode(this.data.usercode).subscribe(res =>{
        this.editdata=res;
        this.registerForm.setValue({
          id:this.editdata.id,
          name:this.editdata.name,
          email:this.editdata.email,
          password:this.editdata.password,
          role:this.editdata.role,
          gender:this.editdata.gender,
          isActive:this.editdata.isActive
        })
      });
    }
  }
  registerForm = this._builder.group({
    id: this._builder.control(''),
    name: this._builder.control(''),
    password: this._builder.control(''),
    email: this._builder.control(''),
    gender: this._builder.control('male'),
    role: this._builder.control('', Validators.required),
    isActive: this._builder.control(false)
  });

  updateUser() {
    if(this.registerForm.valid){
      this._service.updateUser(this.registerForm.value.id, this.registerForm.value).subscribe(res=>{
        this._toastr.success('Updated Successfully');
        this._dialog.close();
      })
      }else{
        this._toastr.warning('Please Select Role')
    }
  }
}
