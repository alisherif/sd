import {HostListener, Component, OnInit } from '@angular/core';

import {ImagesService} from '../services/images.service';

import { HeroService } from '../services/hero.service';
import { Hero } from '../Hero';
import { Router, ActivatedRoute } from '@angular/router';

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
  
  page=1;
  pSize=15;
  dataLen:number;  
  gridCols:number=3;
  T:object[];
  heroes:Hero[];


   imageObject:Array<object>;

  videoObject:Array<object>;
 
  constructor(private router: Router,private imagesService:ImagesService,private heroService:HeroService) {
   

  }

  ngOnInit() {
    if(window.innerWidth<600){
      this.gridCols=2;
    }else
      {    this.gridCols = 3;}
    this.setImageSlider();
    this.setVideoSlider();
    this.getHeroes();

  }

//tabs animation
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

  //pages animation 
  pageChange(){
    this.T=this.heroes.slice((this.page-1)*this.pSize,this.page*this.pSize);
  }
// routing when click card
  toDetails(toId){
    console.log(toId)
    this.router.navigate( ['/details/'+toId] ); 
  }
 
  setImageSlider(){
    this.imagesService.getImages().subscribe(images=>{
      this.imageObject=[];
      images.forEach(element=>{
        var ob={
          image: "https://sudanrevolution.org"+element['url'],
          thumbImage:"https://sudanrevolution.org"+element['url']
        }
        this.imageObject.push(ob)
      });
     
    })
  }
  setVideoSlider(){
    this.imagesService.getVideos().subscribe(video=>{
      
      this.videoObject=video

    })
  }

  getHeroes(){
    this.heroService.getHeros().subscribe(heroes=>{
      this.heroes=heroes
      this.T=this.heroes.slice(this.page-1,this.page*this.pSize);
      this.dataLen=this.heroes.length;

    });
  }


  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const html = document.getElementsByTagName('nav')[0];
    if (number < 500) {
  
    html.classList.add('navbar-transparent');
    }
    else{

      html.classList.remove('navbar-transparent');
    }

  }
  @HostListener('window:resize', ['$event'])
onResize(event) {
  if(window.innerWidth<600){
    this.gridCols=2;
  }else{
    this.gridCols=3;
  }
}
}
