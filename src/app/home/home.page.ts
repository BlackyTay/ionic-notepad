import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  subscription: any;
  constructor(private notesService: NotesService, private alertCtrl: AlertController, private toastCtrl: ToastController, private platform: Platform) {}

  ngOnInit() {
    this.notesService.load();
  }

  addNote() {
    this.alertCtrl.create({
      header: 'New Note',
      message: 'What should the title of this note be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.notesService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  ionViewDidEnter() {
      let backpressedCount = 0;
    this.subscription = this.platform.backButton.subscribe(() => {
      if(backpressedCount+2000 > new Date().getTime()){
          this.toastCtrl.dismiss();
          navigator['app'].exitApp();
      } else {
        this.toastCtrl.create(
          {
            message: 'Press back again to exit',
            duration: 2000,
          }
        ).then((toast) => 
        toast.present() )
      }
      backpressedCount = new Date().getTime();
    } 
    );
  }
}
