import { Component, OnInit, HostListener } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../Hero';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gridCols:number=3;
  hero:Hero;
  images;
  profile;
  constructor(  private route: ActivatedRoute,private heroService:HeroService) { }

  ngOnInit() {
    if(window.innerWidth<400){
      this.gridCols=2;
    }else
      {    this.gridCols = 3;}

    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
    this.getHero();

  }

  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.heroService.getHero(id).subscribe(hero => 
      {
        this.hero =hero
        this.getImages();
      });
  }
  getImages(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroImage(id).subscribe(images=>
      {
        
        this.images=[];
        images.forEach(element => {
          if(element.id==this.hero.thumbnail['id'])
          {
            this.profile="https://sudanrevolution.org"+element['url'];
          }
          else{
          this.images.push("https://sudanrevolution.org"+element['url']);
          }
        });
      console.log(this.images);}
      )
  }
@HostListener('window:resize', ['$event'])
onResize(event) {
  if(window.innerWidth<400){
    this.gridCols=2;
  }else{
    this.gridCols=3;
  }
}


}
