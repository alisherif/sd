import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from '../Hero';
import { Router, ActivatedRoute } from "@angular/router";
import { HeroService } from '../services/hero.service';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {
  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  public loading = false;
  hero:Hero = new Hero();
  gridCols:number=3;
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
  imageIds=[];

  constructor( private route: ActivatedRoute,private router: Router,private heroService:HeroService ) { }

  ngOnInit() {
    if(window.innerWidth<300){
      this.gridCols=2;
    }else
      {    this.gridCols = 3;}
    this.images=[];
    this.imagePath=[];
    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
    this.getHero();
  }


  addFile(id:number,files: FileList){
    let formData = new FormData(); 
      formData.append('image_file', files[0], files[0].name); 
    this.heroService.addHeroImage(id,formData).subscribe((r)=>{
      this.loading=false;
      this.router.navigate( ['/admin'] );
    });
  }
  addProfileFile(id:number,files: FileList){
    let formData = new FormData(); 
      formData.append('image_file', files[0], files[0].name); 
    this.heroService.addHeroThumbnail(id,formData).subscribe((r)=>{
      this.loading=false;
      this.router.navigate( ['/admin'] );
    });
  }

  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.heroService.getHero(id).subscribe(hero => {
      this.hero =hero;
      this.getImages();
    });
    
  }

  getImages(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroImage(id).subscribe(images=>
      {
        images.forEach(element => {
          this.imageIds.push(element.id);
          if(element.id==this.hero.thumbnail['id']){
            this.profile="https://sudanrevolution.org"+element['url']
          }
          else{
          this.images.push("https://sudanrevolution.org"+element['url']);
          }
        });
    }
      );
  }

  imageDelete(){
this.imageIds.forEach(imageid =>{
this.heroService.deleteHeroImage(this.hero.id,imageid).subscribe(del=>console.log("delete "+del));
});
  }

  onSubmit() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.loading =true;
     let DD=this.date_of_death;
     if(DD != undefined)
     this.hero.date_of_death= ""+DD.year+"-"+DD.month+"-"+DD.day+""
    let DI=this.date_of_injuiry
    if(DI != undefined)
    this.hero.date_of_injuiry=""+DI.year+"-"+DI.month+"-"+DI.day+""
    let DB=this.date_of_birth
    if(DB != undefined)
    this.hero.date_of_birth=""+DB.year+"-"+DB.month+"-"+DB.day+""
console.log(this.imagePathP);
    this.heroService.updateHero(id,this.hero).subscribe(r=>{
      if(this.imagePathP !=undefined)
      this.addProfileFile(r.id,this.imagePathP);
      
      this.imagePath.forEach((path)=>{
        this.addFile(r.id,path);
      })
      if(this.imagePathP == undefined && this.imagePath.length <1){
        this.loading=false
        this.router.navigate( ['/admin'] );
    }
      
    });

  }
  onDis(){
    this.router.navigate( ['/home'] );
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
@HostListener('window:resize', ['$event'])
onResize(event) {
  if(window.innerWidth<300){
    this.gridCols=2;
  }else{
    this.gridCols=3;
  }
}

  
}
