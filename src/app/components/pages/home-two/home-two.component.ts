import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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

  interface SolutionCard {
    icon: string;
    title: string;
    description: string;
    isExpanded?: boolean;
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
  @ViewChild('cardContainer') cardContainer!: ElementRef;
  private autoScrollInterval: any;
  private scrollDirection: 'left' | 'right' = 'right';
    contactForm: FormGroup;
    message: string = '';
    selectedDevice = ''; 
    circleState = 'initial';
    slideInterval: any;
    selectedService: any;
    isExpanded: boolean = false;
    maxLength: number = 300;
    circleScale: number = 1;
  circleOpacity: number = 1;
  isHovered = false;
  intervalId: any;

  private scrollListener: () => void;

  clients1: string[] = [
    'assets/images/marquee/hexnode-logo.png',
    'assets/images/marquee/42Gears-logo.png',
    'assets/images/marquee/logitech-logo.png',
    'assets/images/marquee/alogic-logo.png',
    'assets/images/marquee/belkin-logo.png',
    'assets/images/marquee/honeywell-logo.png',
    'assets/images/marquee/jebra-logo.png',
    'assets/images/marquee/poly-logo.png',
    'assets/images/marquee/stm-logo.png',
    'assets/images/marquee/overview-JAMF.png',
    'assets/images/marquee/samsung-logo.png',
    'assets/images/marquee/lg-logo.png',
    'assets/images/marquee/jumpcloud-logo.png',
  ]

  clients2: string[] = [
    'assets/images/marquee/seagate-logo.png',
    'assets/images/marquee/sure-logo.png',
    'assets/images/marquee/kingston-logo.png',
    'assets/images/marquee/bose-logo.png',
    'assets/images/marquee/corsair.png',
    'assets/images/marquee/adobe-logo.png',
    'assets/images/marquee/microsoft-logo.png',
    'assets/images/marquee/kandgi-logo.png',
    'assets/images/marquee/vmware-logo.png',
    'assets/images/marquee/dell.png',
    'assets/images/marquee/hp.png',
    'assets/images/marquee/lenovo.png',
    'assets/images/marquee/epson.png'
  ];

    logos = [
      { src: 'assets/images/marquee/dell.png', alt: 'Client 23', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/hexnode-logo.png', alt: 'Client 1', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/42Gears-logo.png', alt: 'Client 2', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/logitech-logo.png', alt: 'Client 3', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/alogic-logo.png', alt: 'Client 4', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/belkin-logo.png', alt: 'Client 5', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/honeywell-logo.png', alt: 'Client 6', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/jebra-logo.png', alt: 'Client 7', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/poly-logo.png', alt: 'Client 8', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/stm-logo.png', alt: 'Client 9', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/overview-JAMF.png', alt: 'Client 10', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/samsung-logo.png', alt: 'Client 11', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/lg-logo.png', alt: 'Client 12', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/jumpcloud-logo.png', alt: 'Client 13', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/seagate-logo.png', alt: 'Client 14', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/sure-logo.png', alt: 'Client 15', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/kingston-logo.png', alt: 'Client 16', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/bose-logo.png', alt: 'Client 17', scale: 1, opacity: 1 },
        { src: 'assets/images/corsair_new.png', alt: 'Client 18', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/adobe-logo.png', alt: 'Client 19', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/microsoft-logo.png', alt: 'Client 20', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/kandgi-logo.png', alt: 'Client 21', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/vmware-logo.png', alt: 'Client 22', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/hp.png', alt: 'Client 24', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/lenovo.png', alt: 'Client 25', scale: 1, opacity: 1 },
        { src: 'assets/images/marquee/epson.png', alt: 'Client 26', scale: 1, opacity: 1 }
    ];

    
    constructor(
        private fb: FormBuilder, 
        private http: HttpClient,
        private route: ActivatedRoute
    ) {
        this.contactForm = this.fb.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          message: ['', [Validators.required]],
          mobile: ['', [Validators.required]],
          industry: ['', [ Validators.required]]
        });
        emailjs.init("PTmfxUAnOlAZlyhRB");
    }

    solutionCards: SolutionCard[] = [
      { 
        icon: 'assets/images/cloud-removebg-preview.png', 
        title: 'Cloud Solutions', 
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
  their data without losing valuable information, ensuring business continuity.`,
        isExpanded: false
      },
      { 
        icon: 'assets/images/itsolutions-removebg-preview.png', 
        title: 'IT Consulting', 
        description: `Whether you're a startup, small, medium, or large organisation, our journey together begins with a 
  free consultation. We focus on understanding your unique needs and preferences, as well as your 
  future expansion plans. Our team provides comprehensive solutions from start to finish, ensuring 
  seamless integration and execution. With our expertise in IT consulting, we customise our services 
  to align with your business goals, driving efficiency and growth. 
  <br><br>
  Partner with us to transform your technology strategies and stay ahead in the competitive market.`,
        isExpanded: false
      },
      { 
        icon: 'assets/images/repair-support-removebg-preview.png', 
        title: 'Repair and Support', 
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
  continuous optimal performance.`,
        isExpanded: false
      },
      { 
        icon: 'assets/images/leaseing-removebg-preview.png', 
        title: 'Leasing', 
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
  Finance to offer IT equipment on lease.`,
        isExpanded: false
      }
    ];

    ngOnInit() {
      this.startAutoScroll();
        this.startAutoSlide();
        this.calculateServiceItemPositions();
        setTimeout(() => {
          this.circleState = 'visible';
        }, 500);

        this.scrollListener = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);
        
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          const heroSection = document.getElementById('heroSection');
          const heroPlaceholder = document.getElementById('heroPlaceholder');
          const nextSection = document.getElementById('nextSection');
          const clientLogos = document.getElementById('clientLogos');
          const circlesContainer = document.getElementById('circlesContainer');
        
          const expandScrollLimit = 300;
        
          if (scrollY > 50) {
            clientLogos?.classList.add('fade-out');
            circlesContainer?.classList.add('fade-out');
          } else {
            clientLogos?.classList.remove('fade-out');
            circlesContainer?.classList.remove('fade-out');
          }
        
          if (scrollY > expandScrollLimit) {
            heroSection?.classList.add('unfix');
            heroPlaceholder?.classList.add('show');
            nextSection?.classList.add('visible');
          } else {
            heroSection?.classList.remove('unfix');
            heroPlaceholder?.classList.remove('show');
            nextSection?.classList.remove('visible');
          }
        });
        
        this.animateLogos();

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const clientLogos = document.getElementById('clientLogos');
            const logoElements = clientLogos?.querySelectorAll('.client-logo');

            if (scrollY > 50) {
                clientLogos?.classList.add('fade-out');
                logoElements?.forEach(logo => {
                    logo.classList.add('scrolled');
                });
            } else {
                clientLogos?.classList.remove('fade-out');
                logoElements?.forEach(logo => {
                    logo.classList.remove('scrolled');
                });
            }
        });
    }

    ngAfterViewInit() {
        this.route.fragment.subscribe(fragment => {
            if (fragment) {
                this.scrollToSection(fragment);
            }
        });
        this.contactForm.patchValue({ device: null });
        emailjs.init("PTmfxUAnOlAZlyhRB");
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.handleResize.bind(this));
        window.removeEventListener('scroll', this.scrollListener);
        this.stopAutoSlide();
        this.stopAutoScroll();
    }

    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            setTimeout(() => {
                const headerOffset = 80;
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
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
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

    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }


    features = [
        {
          title: 'Logistics',
          description: ' Our Logistics service handles the efficient coordination and management of resources to ensure timely delivery and setup of your solutions. We focus on minimising downtime and disruption to keep your business running smoothly.',
          image: "assets/images/logistics.png"
        },
        {
          title: 'Deployment',
          description: 'Through our Deployment service, we ensure a seamless and efficient implementation of solutions, with minimal impact on your daily operations. Our team ensures everything is set up correctly and functioning optimally from day one.',
          image: "assets/images/deployment.png"
        },
        {
          title: 'Training',
          description: 'We offer comprehensive Training services to equip your team with the skills needed to effectively use new systems and technologies. Our support ensures a smooth transition and maximises the return on your technology investments.',
          image: "assets/images/training.png"
        },
        {
          title: 'Perpetual Support',
          description: 'Our Perpetual Support service provides ongoing assistance to ensure your systems remain secure, up-to-date, and running efficiently. We are committed to delivering continuous improvements and support to optimise your business operations.',
          image: "assets/images/prepetual-support.png"
        },
        {
            title: 'Discover Needs',
            description: 'Our Discover Needs service involves a thorough analysis of your current business operations to identify specific challenges and opportunities for improvement. We work closely with you to understand your goals, ensuring tailored solutions that meet your unique requirements.',
            image: "assets/images/discover.png"
        },
        {
            title: 'PreSales Consulting',
            description: 'With our PreSales Consulting, our team of experts evaluates your requirements and provides strategic advice to help you choose the right solutions. This service ensures informed decision-making, optimising your investments while aligning with your business objectives.',
            image: "assets/images/itsolutions-removebg-preview.png"
        },
        {
            title: 'Architect Solution',
            description: 'The Architect Solution service designs a comprehensive blueprint tailored to your business requirements, ensuring seamless integration of technologies and systems. Our skilled architects work to create scalable and efficient solutions that drive innovation and growth.',
            image: "assets/images/solutions.png"
        },
        {
            title: 'Finance Options',
            description: ' We offer a variety of flexible finance options to support your investment in cutting-edge technology solutions. Our team helps you choose the best payment plans that suit your financial strategy and budget.',
            image: "assets/images/finance.png"
        },
        {
            title: 'Proposal and Quotes',
            description: 'Our Proposal and Quotes service provides detailed, easy-to-understand documentation outlining the costs and benefits of proposed solutions. This transparency ensures you have all the information needed to make confident, informed decisions.',
            image: "assets/images/quote.png"
        },
        {
            title: 'Proof of Concept',
            description: ' Our Proof of Concept service allows you to test and validate potential solutions in a controlled environment before full-scale implementation. This helps mitigate risks and ensures that the chosen solutions are the best fit for your business needs.',
            image: "assets/images/poc.png"
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
          icon: 'assets/images/cloud-removebg-preview.png', 
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
          icon: 'assets/images/itsolutions-removebg-preview.png', 
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
          icon: 'assets/images/repair-support-removebg-preview.png', 
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
          icon: 'assets/images/leaseing-removebg-preview.png', 
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

      activeAccordionIndex: number | null = null;

      private calculateServiceItemPositions() {
        const totalItems = this.services.length;
    const radius = 220;
    
    this.services = this.services.map((item, index) => {
      const angle = (index * Math.PI) / (totalItems - 1);
      
      const x = radius * Math.sin(angle);
      const y = -radius * Math.cos(angle);
      
      return {
        ...item,
        transform: `translate(${x}px, ${y}px)`
      };
    });
      }
    
      selectService(service: ServiceItem) {
        if (this.selectedService === service) {
          this.selectedService = null;
          return;
        }
        
        this.selectedService = service;
        
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

      private handleResize() {
        this.calculateServiceItemPositions();
      }

      toggleAccordion(index: number) {
        this.activeAccordionIndex = this.activeAccordionIndex === index ? null : index;
      }

      cardItems = [
        {
          icon: 'assets/icons/brand-image.svg',
          title: '50+',
          description: 'Brands'
        },
        {
          icon: 'assets/icons/expertise.svg',
          title: '10+',
          description: 'Certified Staff'
        },
        {
          icon: 'assets/icons/people.svg',
          title: '1500+',
          description: 'Corporate Customers'
        },
        {
          icon: 'assets/icons/map.svg',
          title: 'Pan India',
          description: 'support'
        },
        {
          icon: 'assets/icons/device.svg',
          title: '3,00,000+',
          description: 'Devices Deployed'
        }
      ];

      onSubmit() {
        if (this.contactForm.valid) {
          emailjs.send("service_kuiothp", "template_g8fkwgh", {
            to_name: "SDPL",
            from_name: this.contactForm.value.name,
            email: this.contactForm.value.email,
            phone: this.contactForm.value.mobile,
            device: this.contactForm.value.industry,
            message: this.contactForm.value.message,
            reply_to: this.contactForm.value.email,
          })
            .then((response) => {
              this.message = 'Message sent successfully!';
              this.contactForm.reset();
            })
            .catch((error) => {
              this.message = 'Error sending message. Try again later.';
            });
        }
      }

      startAutoSlide() {
           this.intervalId = setInterval(() => {
      if (!this.isHovered) {
        this.nextSlide();
      }
    }, 3000); // Adjust time as needed
      }


      stopAutoSlide() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }

      
      getDisplayContent(): string {
        if (!this.selectedService) return '';
        
        const content = this.selectedService.description;
        if (!this.isContentLong() || this.isExpanded) {
          return content;
        }
        
        return content.substring(0, this.maxLength) + '...';
      }
    
      isContentLong(): boolean {
        return this.selectedService?.description.length > this.maxLength;
      }
    
      toggleReadMore(): void {
        this.isExpanded = !this.isExpanded;
      }

      animateLogos() {
        setInterval(() => {
            this.logos.forEach(logo => {
                logo.scale = 0.8 + Math.random() * 0.4;
                logo.opacity = 0.6 + Math.random() * 0.4;
            });
        }, 2000);
    }

    private handleScroll() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fadeStart = viewportHeight * 0.2;
  
      if (scrollY > fadeStart) {
        this.circleScale = Math.min(3, 1 + (scrollY - fadeStart) / viewportHeight * 2);
        this.circleOpacity = Math.max(0.1, 1 - (scrollY - fadeStart) / viewportHeight);
      } else {
        this.circleScale = 1;
        this.circleOpacity = 1;
      }
    }

  onCardHover(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      if (this.cardContainer) {
        const container = this.cardContainer.nativeElement;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        const isAtStart = container.scrollLeft <= 0;

        // Change direction if we reach the end or start
        if (isAtEnd) {
          this.scrollDirection = 'left';
        } else if (isAtStart) {
          this.scrollDirection = 'right';
        }

        // Scroll in the current direction
        if (this.scrollDirection === 'right') {
          this.scrollRightCards();
        } else {
          this.scrollLeftCards();
        }
      }
    }, 9000); // Scroll every 3 seconds
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  scrollLeftCards() {
    if (this.cardContainer) {
      this.stopAutoScroll(); // Stop auto-scroll when manual interaction occurs
      const container = this.cardContainer.nativeElement;
      container.scrollBy({
        left: -840,
        behavior: 'smooth'
      });
      this.startAutoScroll(); // Restart auto-scroll after manual interaction
    }
  }

  scrollRightCards() {
    if (this.cardContainer) {
      this.stopAutoScroll(); // Stop auto-scroll when manual interaction occurs
      const container = this.cardContainer.nativeElement;
      container.scrollBy({
        left: 840,
        behavior: 'smooth'
      });
      this.startAutoScroll(); // Restart auto-scroll after manual interaction
    }
  }

  toggleReadMoresolution(card: SolutionCard) {
    card.isExpanded = !card.isExpanded;
  }
}
