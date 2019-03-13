import { Component, OnInit, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';
import { ImagesService } from '../images.service';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit,OnDestroy {
  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  public loading = false;
  
  page=1;
  pSize=6;
  dataLen:number;  
  gridCols:number;
  T:object[];
  heroes:Hero[];
  imageObject:Array<object>;
  sliderIds=[];

  constructor(private router: Router,private heroService:HeroService,private imagesService:ImagesService) {
   

  }

  ngOnInit() {
    if(window.innerWidth<600){
      this.gridCols=2;
    }else
      {    this.gridCols = 3;}
    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
    html.classList.remove('fixed-top'); 
    this.setImageSlider();
    this.getHeroes();

  }
  ngOnDestroy(){
    const html = document.getElementsByTagName('nav')[0];
    html.classList.add('navbar-transparent');
    html.classList.add('fixed-top'); 
  }

  //pages animation 
  pageChange(){
    this.T=this.heroes.slice((this.page-1)*this.pSize,this.page*this.pSize);
  }
// routing when click card
  toEdit(toId){
    console.log(toId)
    this.router.navigate( ['/edit/'+toId] ); 
  }
 
  addSliderFile(files: FileList){
    this.loading =true;
    let formData = new FormData(); 
      formData.append('image_file', files[0], files[0].name);
    this.imagesService.addImageSlider(formData).subscribe((r)=>{
      this.loading =false;
      this.setImageSlider();
    });
  }

  getHeroes(){
    this.heroService.getHeros().subscribe(heroes=>{
      this.heroes=heroes
      this.T=this.heroes.slice(this.page-1,this.page*this.pSize);
      this.dataLen=this.heroes.length;

    });
  }

  setImageSlider(){
    this.imagesService.getImages().subscribe(images=>{
      this.imageObject=[];
      images.forEach(element=>{
        this.sliderIds.push(element['id'])
        var ob={
          image: "https://sudanrevolution.org"+element['url'],
          thumbImage:"https://sudanrevolution.org"+element['url']
        }
        this.imageObject.push(ob)
      });
     
    })
  }


  sliderDelete(){
    this.loading =true;
    this.sliderIds.forEach(id=>{
      this.imagesService.deleteImageSlider(id).subscribe(
       ()=> {
        this.loading =false; 
        this.setImageSlider()
      }
      )
    })
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
