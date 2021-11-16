import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.page.html',
  styleUrls: ['./doctor-details.page.scss'],
})
export class DoctorDetailsPage implements OnInit {
  doctor: any;
  displayShedule = false;
  dateslist: any = [];
  width = 300;
  selectedtime;
  selecteddate;
  user: any;
  appointments = []
  loading: boolean;
  constructor(private activatedRoute: ActivatedRoute, private platform: Platform,
    private alert: AlertService, private appservice: AppService, private apiservice: ApiService) {
    this.generateDates();
    this.width = this.platform.width();
    this.selecteddate = this.dateslist[0];
    this.user = this.appservice.getUser();

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data);
      this.doctor = JSON.parse(data.doctor);
      this.getAllDoctorAppointMents()
    });

  }
  getAllDoctorAppointMents() {
    this.apiservice.postData('/doctor/getappointmentsbydoctor', { doctorid: this.doctor.id }).subscribe((res: any) => {
      console.log(res)
      this.appointments = res.data
    })
  }
  generateDates() {
    const currentdate = new Date().getTime();
    const day = 24 * 60 * 60 * 1000;
    for (let i = 1; i < 7; i++) {
      const date = currentdate + i * day;
      this.dateslist.push(new Date(date).getDate());
    }
  }
  onBookAppointment() {
    if (this.displayShedule) {
      if (this.selecteddate === undefined || this.selectedtime === undefined) {
        this.alert.presentToast('please select date and time.');
      }
      else {
        if (this.appointments.length > this.doctor.appointment_lmit) {
          this.alert.presentToast('No Slots available')
        } else {
          this.bookAppointment()
        }
      }
    } else {
      this.displayShedule = !this.displayShedule;
    }
  }
  onChangeTime(time) {
    this.selectedtime = time;
  }
  bookAppointment() {
    this.loading = true;
    const appointment = {
      doctorid: this.doctor.id,
      userid: this.user.id,
      appointment_date: this.selecteddate,
      slot: this.selectedtime
    };
    this.apiservice.postData('/doctor/addappointment', appointment).subscribe((data: any) => {
      console.log(data);
      this.loading = false;
      this.alert.presentToast(data.message);
    });
  }
}
