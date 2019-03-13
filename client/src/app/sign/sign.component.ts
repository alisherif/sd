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

  date_of_death:NgbDateStruct;
  date_of_injuiry:NgbDateStruct;
  date_of_birth:NgbDateStruct;
  
  minDate = {year: 1930, month: 1, day: 1};

  public imagePath:any[];
  public imagePathP;
  profile:any ="../../assets/img/profile.png";
  fistImage:boolean;
  imgURL: any ="../../assets/img/add_photo.png";
  images:any[];

  public message: string;


  constructor(private router: Router,private heroService:HeroService ) { }

  ngOnInit() {
    this.images=[];
    this.imagePath=[];
    this.admin=true;
    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
  
  }

  previewL(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath.push(files);
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.images.push(reader.result);
    }
    console.log(this.imagePath.length);
  }

  previewP(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePathP =files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.profile = reader.result;

  }
}

  addFile(id:number,files: FileList){
    let formData = new FormData(); 
      formData.append('image_file', files[0], files[0].name); 
    this.heroService.addHeroImage(id,formData).subscribe((r)=>{
      console.log(r);
    });
  }
  addProfileFile(id:number,files: FileList){
    let formData = new FormData(); 
      formData.append('image_file', files[0], files[0].name); 
    this.heroService.addHeroThumbnail(id,formData).subscribe((r)=>{
      console.log(r);
    });
  }

  onSubmit() {
    //this.hero.imgUrl=this.imgURL;
   
    let DD=this.date_of_death;
    this.hero.date_of_death= ""+DD.year+"-"+DD.month+"-"+DD.day+""
    let DI=this.date_of_injuiry
    this.hero.date_of_injuiry=""+DI.year+"-"+DI.month+"-"+DI.day+""
    let DB=this.date_of_birth
    this.hero.date_of_birth=""+DB.year+"-"+DB.month+"-"+DB.day+""

    this.heroService.addHero(this.hero).subscribe(r=>{
      if(this.imagePathP !=undefined)
      this.addProfileFile(r.id,this.imagePathP);
      
      this.imagePath.forEach((path)=>{
        console.log(path);
        this.addFile(r.id,path);
      })
    })


  }
  onDis(){
    this.router.navigate( ['/home'] );
  }
  
}
