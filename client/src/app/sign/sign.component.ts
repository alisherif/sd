import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from '../Hero';
import { Router } from "@angular/router";
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  date: {year: number, month: number};
  hero:Hero = new Hero();
  model: NgbDateStruct;
  admin:boolean;
  constructor(private router: Router,private heroService:HeroService ) { }

  ngOnInit() {
    this.admin=true;
    const html = document.getElementsByTagName('nav')[0];
    console.log(html);
    html.classList.remove('navbar-transparent');
    console.log(html);
  }

  public imagePath;
  imgURL: any ="../../assets/img/main.png";
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  onSubmit() {
    this.hero.imgUrl=this.imgURL;
    console.log(this.hero);
    this.heroService.addHero(this.hero).subscribe(r=>{

      console.log(r);
    })

  }
  onDis(){
    this.router.navigate( ['/home'] );
  }
  
}
