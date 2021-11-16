import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController) { }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }
}
