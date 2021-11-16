import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private doctors: any = [];
  private categories: any = [];
  private user: any={};
  constructor() { }
  setDoctors(doctors) {
    this.doctors = doctors;
  }
  getDoctors() {
    return this.doctors;
  }
  setCategories(cat) {
    this.categories = cat;
  }
  getCategories() {
    return this.categories;
  }
  setUser(user) {
    localStorage.setItem('user',JSON.stringify(user));
    this.user = user;
  }
  getUser(){
    return this.user;
  }
}
