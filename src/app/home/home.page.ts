import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  doctors = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true
  };
  width: any = 300;
  categories: any=[];
  constructor(private platform: Platform, private router: Router, private apiservice: ApiService, private appService: AppService) {
    this.width = this.platform.width();
  }
  ngOnInit() {
    this.getAllDoctors();
    this.getAllCategories();
  }
  viewDoctor(doctor) {
    this.router.navigate(['/doctor-details', JSON.stringify(doctor)]);
  }
  getAllDoctors() {
    this.apiservice.postData('/doctor/getalldoctors', {}).subscribe((res: any) => {
      console.log(res);
      this.doctors=res.data;
      this.appService.setDoctors(res.data);
    });
  }
  getAllCategories() {
    this.apiservice.postData('/doctor/getallcategories', {}).subscribe((res: any) => {
      console.log(res);
      this.categories=res.data;
      this.appService.setDoctors(res.data);
    });
  }
}
