import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../Hero';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  hero:Hero;
  images=[];
  constructor(  private route: ActivatedRoute,private heroService:HeroService) { }

  ngOnInit() {
    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
    
    this.getImages();
    this.getHero();
  }

  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.heroService.getHero(id).subscribe(hero => this.hero =hero);
  }
  getImages(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroImage(id).subscribe(images=>
      {
        images.forEach(element => {
          this.images.push(element['url']);
          
        });
      console.log(this.images);}
      )
  }


}
