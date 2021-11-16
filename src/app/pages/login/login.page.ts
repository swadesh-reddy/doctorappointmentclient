import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    fullname: new FormControl(null, [Validators.required]),
    contactNumber: new FormControl(null, [Validators.required]),
  });
  width: any = 300;
  constructor(private platform: Platform, private appService: AppService, private router: Router) {
    this.width = this.platform.width();
  }

  ngOnInit() {
  }
  loginClicked() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      const user = {
        id: 1,
        fullname: this.loginForm.get('fullname').value,
        contact: this.loginForm.get('contactNumber').value,
      };
      this.appService.setUser(user);
      this.router.navigate(['/home']);
    } else {
      this.validateFormFields(this.loginForm);
    }
  }
  validateFormFields(form: FormGroup): void {
    Object.keys(form.controls).forEach((element) => {
      const control = form.get(element) as FormControl;
      control.markAsTouched();
    });
  }
}
