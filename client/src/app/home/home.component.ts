import { Component, OnInit } from '@angular/core';

import {ImagesService} from '../images.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];
  
  imageObject:Array<object>=[{image: '../../assets/img/main.png',
  thumbImage: '../../assets/img/main.png'},
  {image: '../../assets/img/heros.jpg',
  thumbImage: '../../assets/img/heros.jpg'},
  {image: '../../assets/img/mod.jpg',
  thumbImage: '../../assets/img/mod.jpg'},
  {image: '../../assets/img/main.png',
  thumbImage: '../../assets/img/main.png'},
  {image: '../../assets/img/heros.jpg',
  thumbImage: '../../assets/img/heros.jpg'},
  {image: '../../assets/img/mod.jpg',
  thumbImage: '../../assets/img/mod.jpg'}
];
  
  
  videoObject:Array<object>=[

    {video:'https://www.youtube.com/watch?v=immgEQZSu3E'},
    {video:'https://www.youtube.com/watch?v=4GlbFHwQOqY'},
    {video:'https://www.youtube.com/watch?v=qda0nbGLRxA'},
    {video:'https://www.youtube.com/watch?v=immgEQZSu3E'},
    {video:'https://www.youtube.com/watch?v=4GlbFHwQOqY'},
    {video:'https://www.youtube.com/watch?v=qda0nbGLRxA'}
  ]
  constructor(private imagesService:ImagesService) {}

  ngOnInit() {
    const html = document.getElementsByTagName('nav')[0];
    console.log(html);
    html.classList.add('navbar-transparent');
  }


  tabSwitch(name:any){
    const htmlI = document.getElementsByName('aImage')[0];
    const htmlV = document.getElementsByName('aVideo')[0];
    const htmlTI = document.getElementsByName('images')[0];
    const htmlTV = document.getElementsByName('videos')[0];
    if(name=="images"){
      htmlV.classList.remove('active');
      htmlI.classList.add('active');
      htmlTV.classList.remove('active');
      htmlTI.classList.add('active');
      
    }else{
      htmlI.classList.remove('active');
      htmlV.classList.add('active');
      htmlTI.classList.remove('active');
      htmlTV.classList.add('active');
    }
  }

 

}
