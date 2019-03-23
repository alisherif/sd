import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { EMessage } from '../message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
 // message:EMessage;
  public message: EMessage;
  constructor(private mailService:MailService,private router: Router) { 
    this.message=new EMessage();
  }

  ngOnInit() {
    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
  }
  toMail(){
    this.mailService.toMailbox(this.message);
    this.router.navigate( ['/home'] );
  }

 // public captchaResponse: string = '';
  public resolved(captchaResponse: string) {
    const newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
      this.message.captcha=newResponse;

      this.toMail();

  }

}
