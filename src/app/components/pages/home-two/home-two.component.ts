import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import emailjs from '@emailjs/browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

interface FeatureCard {
    title: string;
    description: string;
    icon?: string;
  }

  interface ServiceItem {
    icon: string;
    title: string;
    transform: string;
    description: string;
  }

@Component({
    selector: 'app-home-two',
    templateUrl: './home-two.component.html',
    styleUrls: ['./home-two.component.scss'],
    animations: [
      trigger('circleAnimation', [
        state('initial', style({
          opacity: 0,
          transform: 'scale(0.5)'
        })),
        state('visible', style({
          opacity: 1,
          transform: 'scale(1)'
        })),
        transition('initial => visible', animate('0.6s ease'))
      ])
    ]
})
export class HomeTwoComponent implements OnInit, AfterViewInit, OnDestroy {
    contactForm: FormGroup;
    message: string = '';
    selectedDevice = ''; 
    circleState = 'initial';

    constructor(
        private fb: FormBuilder, 
        private http: HttpClient,
        private route: ActivatedRoute
    ) {
        this.contactForm = this.fb.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          message: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          device: ['']
        });
        emailjs.init("PTmfxUAnOlAZlyhRB");
    }

    ngOnInit() {
        this.calculateServiceItemPositions();
        // Trigger the animation after a delay
        setTimeout(() => {
          this.circleState = 'visible';
        }, 500);
        
        // Add resize listener
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    ngAfterViewInit() {
        // Check for fragment and scroll to that section after view is initialized
        this.route.fragment.subscribe(fragment => {
            if (fragment) {
                this.scrollToSection(fragment);
            }
        });
    }

    ngOnDestroy() {
        // Clean up resize listener when component is destroyed
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    /**
     * Scrolls to a specific section using its ID
     * @param sectionId The ID of the section to scroll to
     */
    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            // Add a small delay to ensure all animations and layout calculations are complete
            setTimeout(() => {
                // Calculate position accounting for navbar height
                const headerOffset = 80; // Adjust this value based on your navbar height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 200);
        }
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
      // Check scroll position and update circle scale if needed
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        // When scrolling down, make circles larger
        document.querySelectorAll('.circle').forEach(circle => {
          (circle as HTMLElement).style.transform = `scale(${1 + (scrollPosition * 0.001)})`;
        });
      }
    }

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

      services: ServiceItem[] = [
        { 
          icon: 'https://ik.imagekit.io/xic57rvk8yp/cloud_n-oQmCmr-.png?updatedAt=1743764966503', 
          title: 'Cloud Solutions', 
          transform: '',
          description: `Cloud solutions have transformed the way organisations operate by providing a flexible, cost
effective, and scalable platform for storing, managing, and processing data. These solutions 
leverage remote servers hosted on the internet to store and process data, which can be accessed 
from anywhere at any time. Here are five top benefits of adopting cloud solutions for organisations:
<br><br>
<strong>Cost Efficiency:</strong> By moving to the cloud, organisations can significantly reduce their IT costs. 
They eliminate the need for purchasing and maintaining expensive hardware and infrastructure 
since cloud services operate on a pay-as-you-go model, allowing businesses to pay only for the 
resources they use.
<br><br>
<strong>Scalability:</strong> Cloud solutions allow organisations to easily scale their resources up or down based 
on their needs. This flexibility ensures that businesses can handle increased loads during peak 
times without the need for permanent infrastructure additions, thus maintaining operational 
efficiency.
<br><br>
<strong>Improved Collaboration and Accessibility:</strong> With cloud solutions, employees can access data 
and applications from anywhere with an internet connection. This enhances collaboration among 
team members, especially in a world where remote work is becoming increasingly common, and 
ensures that everyone has access to the latest information.
<br><br>
<strong>Enhanced Security:</strong> Leading cloud providers invest heavily in security measures to protect data 
against breaches and cyber threats. Cloud solutions offer robust security features like encryption, 
authentication, and access control, ensuring that organisational data remains secure.
<br><br>
<strong>Disaster Recovery and Backup:</strong> Cloud solutions provide reliable data backup and disaster 
recovery options. In the event of a system failure or any disaster, organisations can quickly recover 
their data without losing valuable information, ensuring business continuity.`
        },
        { 
          icon: 'https://ik.imagekit.io/xic57rvk8yp/consultant_OJETVCvZ5W.png?updatedAt=1743764966182', 
          title: 'IT Consulting', 
          transform: '',
          description: `Whether you're a startup, small, medium, or large organisation, our journey together begins with a 
free consultation. We focus on understanding your unique needs and preferences, as well as your 
future expansion plans. Our team provides comprehensive solutions from start to finish, ensuring 
seamless integration and execution. With our expertise in IT consulting, we customise our services 
to align with your business goals, driving efficiency and growth. 
<br><br>
Partner with us to transform your technology strategies and stay ahead in the competitive market.`
        },
        { 
          icon: 'https://ik.imagekit.io/xic57rvk8yp/repair_ub9f93pCHW.png?updatedAt=1743764966563', 
          title: 'Repair and Support', 
          transform: '',
          description: `Our Superior service team comprises highly skilled engineers who are certified by leading 
brands such as Apple, Microsoft, HP, Dell, and Lenovo, ensuring top-notch software and 
hardware repair and support.
<br><br>
<strong>Rapid Incident Support:</strong> Our expertise allows us to provide swift diagnosis and resolution 
per incident, minimising downtime and ensuring your operations continue smoothly.
<br><br>
<strong>Comprehensive Annual Maintenance Contracts:</strong> With our annual maintenance 
contracts, you can expect ongoing, reliable support tailored to prevent and address issues 
promptly, enhancing the productivity of your business.
<br><br>
<strong>Dedicated On-Premise Engineer:</strong> Benefit from having a dedicated engineer on-site who 
is familiar with your systems, ensuring immediate support and personalised service for any 
technical needs.
<br><br>
<strong>Scheduled Free Health Checkups:</strong> Take advantage of planned health checkups to 
proactively identify potential issues before they impact your operations, ensuring 
continuous optimal performance.`
        },
        { 
          icon: 'https://ik.imagekit.io/xic57rvk8yp/leasing_wKaUgRUuK.png?updatedAt=1743764966653', 
          title: 'Leasing', 
          transform: '',
          description: `Leasing technology equipment enables organisations to access the latest technology 
without incurring a significant upfront cost, and offers flexibility for upgrades. It generally 
includes maintenance and support services to keep the equipment in optimal condition. At 
the end of the lease, organisations have the option to return the equipment, continue 
leasing, or purchase it, which helps in managing cash flow and aligning expenses with 
usage.
<br><br>
<strong>Benefits to Organisations:</strong>
<br><br>
<strong>Cost Management:</strong> Leasing avoids the substantial initial cost associated with purchasing 
IT devices, allowing businesses to conserve capital for other operational needs.
<br><br>
<strong>Technology Upgrades:</strong> Organisations can regularly upgrade to the latest technology 
without the financial burden of replacing outdated equipment.
<br><br>
<strong>Predictable Expenses:</strong> Leasing provides fixed monthly payments, making it easier for 
companies to budget and plan their financials.
<br><br>
<strong>Maintenance and Support:</strong> Leased IT devices often come with maintenance and support 
services, reducing the need for in-house technical support and associated costs.
<br><br>
<strong>Flexibility and Scalability:</strong> Businesses can easily scale their IT infrastructure up or down 
according to changing needs, without being stuck with obsolete equipment.
<br><br>
Superior Digital collaborates with renowned finance entities like TATA Capital and HP 
Finance to offer IT equipment on lease.`
        }
      ];

      selectedService: ServiceItem | null = null;
      activeAccordionIndex: number | null = null;

      private calculateServiceItemPositions() {
        const totalItems = this.services.length;
    const radius = 220; // Adjust this value to change the wheel size
    
    this.services = this.services.map((item, index) => {
      // Calculate angle for semi-circle (180 degrees or π radians)
      const angle = (index * Math.PI) / (totalItems - 1);
      
      // Calculate x and y positions
      // We use -Math.cos for y to make the semi-circle face upward
      const x = radius * Math.sin(angle);
      const y = -radius * Math.cos(angle);
      
      return {
        ...item,
        transform: `translate(${x}px, ${y}px)`
      };
    });
      }
    
      selectService(service: ServiceItem) {
        // If already selected, deselect it
        if (this.selectedService === service) {
          this.selectedService = null;
          return;
        }
        
        // Apply selected class immediately for responsive feedback
        this.selectedService = service;
        
        // For mobile devices, scroll to content section after a slight delay
        if (window.innerWidth <= 991) {
          setTimeout(() => {
            const contentSection = document.querySelector('.content-section');
            if (contentSection) {
              contentSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
              });
            }
          }, 300);
        }
      }

      // Handle window resize
      private handleResize() {
        this.calculateServiceItemPositions();
      }

      toggleAccordion(index: number) {
        this.activeAccordionIndex = this.activeAccordionIndex === index ? null : index;
      }
}