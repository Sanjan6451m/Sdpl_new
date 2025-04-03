import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

serviceLocations: number = 0;
  happyCustomers: number = 0;
  salesSupport: number = 0;
    constructor() { }

    ngOnInit() {
		this.startCountUp('serviceLocations', 30);
		this.startCountUp('happyCustomers', 1000);
		this.startCountUp('salesSupport', 150);
	  }
    
    clientWrap: OwlOptions = {
		loop:true,
		margin:30,
		nav:false,
		mouseDrag: true,
		items:1,
		dots: false,
		autoHeight: true,
		autoplay: true,
		smartSpeed: 800,
		autoplayHoverPause: true,
		center: false,
		responsive:{
			0:{
				items:1,
				margin: 10,
			},
			576:{
				items:1,
			},
			768:{
				items:2,
				margin: 20,
			},
			992:{
				items:2,
			},
			1200:{
				items:2,
			}
		}
    }

	// Video Popup
	isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

	startCountUp(property: 'serviceLocations' | 'happyCustomers' | 'salesSupport', target: number) {
		let count = 0;
		let duration = 3000; // Animation duration in milliseconds
		let intervalTime = duration / target;
	
		let interval = setInterval(() => {
		  if (count < target) {
			count++;
			(this[property] as number) = count;
		  } else {
			clearInterval(interval);
		  }
		}, intervalTime);
	  }

}