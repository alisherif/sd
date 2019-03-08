import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.heroService.getHero(4).subscribe((o)=>
    console.log(o))
  }

}
