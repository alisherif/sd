import { Component, OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit,OnDestroy{

  constructor() { }

  ngOnInit() {
    const html = document.getElementsByTagName('nav')[0];
    html.style.display='none';
  }
  ngOnDestroy(){
    const html = document.getElementsByTagName('nav')[0];
    html.style.display='block';
  }

}
