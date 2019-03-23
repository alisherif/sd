import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EMessage } from '../message';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }
  toMailbox(message:EMessage){
    window.location.href = `mailto:${message.email}?subject=${message.subject}&body=${message.body}`;
  }
}
