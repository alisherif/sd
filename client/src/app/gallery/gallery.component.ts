import { Component, Input } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-modal-content',
  template: `
  <div class="modal-header">
      <h5 class="modal-title text-center"></h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
      </button>
  </div>
  <div class="modal-body">
  <mat-card>
    <img  mat-card-image src="{{image}}"  >
    </mat-card>
      </div>
    
  `
})
export class NgbdModalContent {
  @Input() image;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent  {
gallary= [];
  constructor(private modalService: NgbModal,private heroService:HeroService) {
    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
  
   this.getHeroes();
  }
  open(img:string) {
    console.log("open html")
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.image = img;
  }

  getHeroes(){
    this.heroService.getHeros().subscribe(heroes=>{
      heroes.forEach((hero)=>{
      this.heroService.getHeroImage(hero.id).subscribe((images)=>{
        images.forEach(element => {
         
          this.gallary.push("https://sudanrevolution.org"+element['url']);
        
        });
       
      }
      )
      
    }
    );
  });

  }

}
