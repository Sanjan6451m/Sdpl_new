import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import emailjs from '@emailjs/browser';

interface FeatureCard {
    title: string;
    description: string;
    icon?: string;
  }

@Component({
    selector: 'app-home-two',
    templateUrl: './home-two.component.html',
    styleUrls: ['./home-two.component.scss']
})
export class HomeTwoComponent implements OnInit {
    contactForm: FormGroup;
    message: string = '';
    selectedDevice = ''; 

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.contactForm = this.fb.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          message: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          device: ['']
        });
        emailjs.init("PTmfxUAnOlAZlyhRB");
    }

    ngOnInit(): void {}

    images: string[] = [
        'assets/images/marquee/hexnode-logo.png',
        'assets/images/marquee/42Gears-logo.png',
        'assets/images/marquee/logitech-logo.png',
        'assets/images/marquee/alogic-logo.png',
        'assets/images/marquee/belkin-logo.png',
        'assets/images/marquee/honeywell-logo.png',
        'assets/images/marquee/jebra-logo.png',
        'assets/images/marquee/poly-logo.png',
        'assets/images/marquee/stm-logo.png'
      ];

      devices = [
        'MacBook Air',
        'MacBook Pro',
        'iMac',
        'Mac Mini', 
        'Mac Studio', 
        'Mac Pro', 
        'iPad', 
        'iPhone', 
        'Apple Watch', 
        'Airpods', 
        'Other Accessories', 
    ]; 

    
      owlCarouselOptions = {
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
          0: { items: 2 },
          480: { items: 3 },
          640: { items: 4 },
          992: { items: 6 }
        }
      };

    homeSlides: OwlOptions = {
		animateOut: 'slideOutDown',
        animateIn: 'slideInDown',
        items: 1,
        loop: true,
        autoplay: true,
        dots: false,
        nav: true,
        autoHeight: true,
        autoplaySpeed: 800,
        mouseDrag: false,
        autoplayHoverPause: true,
        navText: [
            "<i class='flaticon-left-arrow'></i>", 
            "<i class='flaticon-next-1'></i>"
        ],
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1200: {
                items: 1,
            }
        }
    }
    teamSlides: OwlOptions = {
		loop: true,
        margin: 20,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
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

    onSubmit() {
        if (this.contactForm.valid) {
            this.message = 'Sending message...';
            
            emailjs.send("service_kuiothp", "template_g8fkwgh", {
                to_name: "SDPL",
                from_name: this.contactForm.value.name,
                email: this.contactForm.value.email,
                phone: this.contactForm.value.phone,
                device: this.contactForm.value.device,
                message: this.contactForm.value.message,
                reply_to: this.contactForm.value.email
            })
            .then((response) => {
                this.message = 'Message sent successfully!';
                this.contactForm.reset();
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                this.message = 'Error sending message. Please try again later.';
                console.error('FAILED...', error);
            });
        } else {
            this.message = 'Please fill in all required fields correctly.';
        }
    }
    
    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }


    features: FeatureCard[] = [
        {
          title: 'Logistics',
          description: ' Our Logistics service handles the efficient coordination and management of resources to ensure timely delivery and setup of your solutions. We focus on minimising downtime and disruption to keep your business running smoothly.',
          icon: 'bx bx-package'
        },
        {
          title: 'Deployment',
          description: 'Through our Deployment service, we ensure a seamless and efficient implementation of solutions, with minimal impact on your daily operations. Our team ensures everything is set up correctly and functioning optimally from day one.',
          icon: 'bx bx-rocket'
        },
        {
          title: 'Training',
          description: 'We offer comprehensive Training services to equip your team with the skills needed to effectively use new systems and technologies. Our support ensures a smooth transition and maximises the return on your technology investments.',
          icon: 'bx bx-book-open'
        },
        {
          title: 'Perpetual Support',
          description: 'Our Perpetual Support service provides ongoing assistance to ensure your systems remain secure, up-to-date, and running efficiently. We are committed to delivering continuous improvements and support to optimise your business operations.',
          icon: 'bx bx-support'
        },
        {
            title: 'Discover Needs',
            description: 'Our Discover Needs service involves a thorough analysis of your current business operations to identify specific challenges and opportunities for improvement. We work closely with you to understand your goals, ensuring tailored solutions that meet your unique requirements.',
            icon: 'bx bx-search-alt'
        },
        {
            title: 'PreSales Consulting',
            description: 'With our PreSales Consulting, our team of experts evaluates your requirements and provides strategic advice to help you choose the right solutions. This service ensures informed decision-making, optimising your investments while aligning with your business objectives.',
            icon: 'bx bx-conversation'
        },
        {
            title: 'Architect Solution',
            description: 'The Architect Solution service designs a comprehensive blueprint tailored to your business requirements, ensuring seamless integration of technologies and systems. Our skilled architects work to create scalable and efficient solutions that drive innovation and growth.',
            icon: 'bx bx-layer'
        },
        {
            title: 'Finance Options',
            description: ' We offer a variety of flexible finance options to support your investment in cutting-edge technology solutions. Our team helps you choose the best payment plans that suit your financial strategy and budget.',
            icon: 'bx bx-money'
        },
        {
            title: 'Proposal and Quotes',
            description: 'Our Proposal and Quotes service provides detailed, easy-to-understand documentation outlining the costs and benefits of proposed solutions. This transparency ensures you have all the information needed to make confident, informed decisions.',
            icon: 'bx bx-file'
        },
        {
            title: 'Proof of Concept',
            description: ' Our Proof of Concept service allows you to test and validate potential solutions in a controlled environment before full-scale implementation. This helps mitigate risks and ensures that the chosen solutions are the best fit for your business needs.',
            icon: 'bx bx-test-tube'
        }
      ];
      
      activeIndex = 0;
    
      
    
      prevSlide() {
        this.activeIndex = (this.activeIndex - 1 + this.features.length) % this.features.length;
      }
    
      nextSlide() {
        this.activeIndex = (this.activeIndex + 1) % this.features.length;
      }
}