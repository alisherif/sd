import { Component, Input, HostListener } from '@angular/core';

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
    <img src="{{image}}" />
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

  page=1;
  pSize=15;
  dataLen:number;  
  gridCols:number=3;
  T:string[];
gallary= [];
  constructor(private modalService: NgbModal,private heroService:HeroService) {
    if(window.innerWidth<600){
      this.gridCols=2;
    }else
      {    this.gridCols = 3;}

    const html = document.getElementsByTagName('nav')[0];
    html.classList.remove('navbar-transparent');
  
   this.getHeroes()
  }
  open() {
    console.log("open html")
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.image = '../../assets/img/main.png';
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
    try {
      this.T=this.gallary.slice(this.page-1,this.page*this.pSize);
    } catch (error) {
      console.log("no T")
    }
    
      this.dataLen=this.gallary.length;

  });

  }

  pageChange(){
    this.T=this.gallary.slice((this.page-1)*this.pSize,this.page*this.pSize);
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
