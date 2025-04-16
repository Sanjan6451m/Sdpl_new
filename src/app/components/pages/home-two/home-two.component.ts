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

interface Solutionweb {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
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
  private isAutoScrolling = true;
  private readonly SCROLL_INTERVAL = 3000; // 3 seconds between scrolls
  private scrollTimeout: any;

  private scrollListener: () => void;

  private scrollCount = 0;
  private readonly SCROLL_THRESHOLD = 10;

  clients1: string[] = [
    'assets/images/marquee/hexnode_new.png',
    'assets/images/marquee/42Gears-logo.png',
    'assets/images/marquee/logitech-logo.png',
    'assets/images/marquee/alogic.png',
    'assets/images/marquee/belkin.png',
    'assets/images/marquee/honeywell-logo.png',
    'assets/images/marquee/jabra.png',
    'assets/images/marquee/poly-logo.png',
    'assets/images/marquee/stm-logo.png',
    'assets/images/marquee/overview-JAMF.png',
    'assets/images/marquee/samsung.png',
    'assets/images/marquee/lg.png',
    'assets/images/marquee/jumpcloud-logo.png',
    'assets/images/marquee/yealink.png',
    'assets/images/marquee/asus.png',
    'assets/images/marquee/dlink.png',
    'assets/images/marquee/opengear.png',
    'assets/images/marquee/synology.png',
  ]

  clients2: string[] = [
    'assets/images/marquee/seagate.png',
    'assets/images/marquee/shure.png',
    'assets/images/marquee/kingston-logo.png',
    'assets/images/marquee/bose-logo.png',
    'assets/images/marquee/corsair.png',
    'assets/images/marquee/adobe-logo.png',
    'assets/images/marquee/microsoft.png',
    'assets/images/marquee/cisco_new.png',
    'assets/images/marquee/acer.png',
    'assets/images/marquee/hikvision.png',
     'assets/images/marquee/intel.png',
    'assets/images/marquee/kandgi-logo.png',
    'assets/images/marquee/vmware-logo.png',
    'assets/images/marquee/dell.png',
    'assets/images/marquee/hp.png',
    'assets/images/marquee/lenovo_new.png',
    'assets/images/marquee/epson.png',
     'assets/images/marquee/jabra.png',
    'assets/images/marquee/jbl.png'
  ];

  logos = [
    { src: 'assets/images/marquee/dell.png', alt: 'Client 23', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/hexnode_new.png', alt: 'Client 1', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/42Gears-logo.png', alt: 'Client 2', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/logitech-logo.png', alt: 'Client 3', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/alogic.png', alt: 'Client 4', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/belkin.png', alt: 'Client 5', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/honeywell-logo.png', alt: 'Client 6', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/jabra.png', alt: 'Client 7', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/poly-logo.png', alt: 'Client 8', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/stm-logo.png', alt: 'Client 9', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/overview-JAMF.png', alt: 'Client 10', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/samsung.png', alt: 'Client 11', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/lg.png', alt: 'Client 12', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/jumpcloud-logo.png', alt: 'Client 13', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/seagate.png', alt: 'Client 14', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/shure.png', alt: 'Client 15', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/kingston-logo.png', alt: 'Client 16', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/bose-logo.png', alt: 'Client 17', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/corsair.png', alt: 'Client 18', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/adobe-logo.png', alt: 'Client 19', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/microsoft.png', alt: 'Client 20', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/kandgi-logo.png', alt: 'Client 21', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/vmware-logo.png', alt: 'Client 22', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/hp.png', alt: 'Client 24', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/lenovo_new.png', alt: 'Client 25', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/epson.png', alt: 'Client 26', scale: 1, opacity: 1 },

    { src: 'assets/images/marquee/cisco_new.png', alt: 'Client 27', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/yealink.png', alt: 'Client 28', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/asus.png', alt: 'Client 29', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/intel.png', alt: 'Client 30', scale: 1, opacity: 1 },

    { src: 'assets/images/marquee/acer.png', alt: 'Client 31', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/dlink.png', alt: 'Client 32', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/hikvision.png', alt: 'Client 33', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/opengear.png', alt: 'Client 34', scale: 1, opacity: 1 },

    { src: 'assets/images/marquee/jbl.png', alt: 'Client 35', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/synology.png', alt: 'Client 36', scale: 1, opacity: 1 },
    { src: 'assets/images/marquee/jabra.png', alt: 'Client 37', scale: 1, opacity: 1 },
  ];


    constructor(
        private fb: FormBuilder, 
        private http: HttpClient,
        private route: ActivatedRoute
    ) {
        this.contactForm = this.fb.group({
          name: ['', [Validators.required]],
          email: ['', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
          ]],
          message: ['', [Validators.required]],
          mobile: ['', [
            Validators.required, 
            Validators.pattern('^[0-9]{10}$'),
            Validators.minLength(10),
            Validators.maxLength(10)
          ]],
          industry: ['', [Validators.required]]
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
    },
    {
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'IT Lifecycle Management',
      description: `Superior Digital oﬀers end-to-end IT Lifecycle Management solutions to help businesses
maximise the value of their technology investments. From procurement and deployment to
maintenance and secure disposal, we manage every stage of your IT assets eﬃciently. Our
approach ensures devices remain secure, up-to-date, and optimised for performance throughout
their lifecycle. With expert support and strategic planning, we help reduce costs, minimise
downtime, and enhance productivity. Trust Superior Digital to keep your IT infrastructure reliable,
scalable, and future-ready.`,
      isExpanded: false
    },
    {
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'IT Assets Insurance',
      description: `Superior Digital partners with leading insurance providers to oﬀer comprehensive IT Assets
Insurance solutions for organisations. We help protect your valuable IT infrastructure against theft,
damage, accidental loss, and unforeseen risks. Our tailored insurance plans ensure business
continuity and peace of mind, no matter the scale of your operations. With streamlined claim
processes and expert guidance, we make asset protection simple and stress-free. Safeguard your
technology investments with Superior Digital's trusted insurance partnerships.`,
      isExpanded: false
    },
    {
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Warehousing Solutions',
      description: `Superior Digital is proud to oﬀer expert Warehousing Solutions tailored to meet your business
needs. Whether it's short-term storage or long-term inventory management, we provide secure,
organised, and scalable warehousing options. Our experienced team ensures seamless handling,
tracking, and distribution of your IT assets. We're just a call away to meet you in person,
understand your requirements, and design an eﬀective solution. Partner with Superior Digital for
reliable, eﬃcient, and customised warehousing support.`,
      isExpanded: false
    },
    {
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Supply Chain',
      description: `Superior Digital oﬀers comprehensive Operational and Supply Chain Services to streamline your
business processes and enhance eﬃciency. From procurement and logistics to inventory
management and last-mile delivery, we ensure every link in your supply chain is optimised. Our
solutions are designed to reduce costs, minimise delays, and improve overall operational
performance. With real-time tracking and dedicated support, you gain full visibility and control
over your supply chain. Let Superior Digital be your trusted partner in driving seamless and
scalable operations.`,
      isExpanded: false
    },
    {
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Asset Management & Tagging',
      description: `Superior Digital is committed to delivering reliable Asset Management services that keep your IT
infrastructure organised and eﬃcient. We provide detailed Inventory Reports, ensuring accurate
tracking and visibility of all your devices. Our service includes Device Diagnostics during
Reverse Pickup, helping identify issues quickly and reduce downtime. Comprehensive
Reporting keeps you informed at every stage, from deployment to recovery. With Superior Digital,
managing your IT assets becomes seamless, transparent, and hassle-free.

Superior Digital oﬀers precise and professional Asset Tagging services to help you track and
manage your IT equipment eﬀortlessly. Each asset is tagged with a unique identifier, enabling
easy monitoring, maintenance, and auditing. Our tagging solutions support better inventory
control, loss prevention, and compliance with organisational policies. Whether it's during
deployment or ongoing operations, we ensure accurate tagging and data recording. Trust
Superior Digital to bring structure and visibility to your asset management process.`,
      isExpanded: false
    }
  ];

  private lastScrollPosition = 0;
  private currentRotation = 0;
  private readonly ROTATION_SPEED = 2;
  private readonly TOTAL_SOLUTIONS = 9;
  private readonly DEGREES_PER_SOLUTIONS = 360 / this.TOTAL_SOLUTIONS;
  private lastSolutionIndex = 1;
  selectedSolution: Solutionweb | null = null;
  defaultDescription = 'Each enterprise customer is assigned an Account Manager as their single point of contact for after-sales support, additional procurement, and value-added services. With quick turnaround times, proactive support, and priority service, we ensure an exceptional customer experience. Dedicated CRM and purchase/support portals are available upon request for 24/7 convenience. Our team prioritizes customer data security at every step.';


  Solutions: Solutionweb[] = [
    {
      id: 1,
      icon: 'assets/images/cloud-removebg-preview.png',
      title: 'Cloud Solutions',
      subtitle: 'Cloud Solutions',
      description: `Cloud solutions have transformed the way organisations operate by providing a flexible, cost
  effective, and scalable platform for storing, managing, and processing data. These solutions 
  leverage remote servers hosted on the internet to store and process data, which can be accessed 
  from anywhere at any time. Here are five top benefits of adopting cloud solutions for organisations:
  
  Cost Efficiency: By moving to the cloud, organisations can significantly reduce their IT costs. 
  They eliminate the need for purchasing and maintaining expensive hardware and infrastructure 
  since cloud services operate on a pay-as-you-go model, allowing businesses to pay only for the 
  resources they use.
  
  Scalability: Cloud solutions allow organisations to easily scale their resources up or down based 
  on their needs. This flexibility ensures that businesses can handle increased loads during peak 
  times without the need for permanent infrastructure additions, thus maintaining operational 
  efficiency.
  
  Improved Collaboration and Accessibility: With cloud solutions, employees can access data 
  and applications from anywhere with an internet connection. This enhances collaboration among 
  team members, especially in a world where remote work is becoming increasingly common, and 
  ensures that everyone has access to the latest information.
  
  Enhanced Security: Leading cloud providers invest heavily in security measures to protect data 
  against breaches and cyber threats. Cloud solutions offer robust security features like encryption, 
  authentication, and access control, ensuring that organisational data remains secure.
  
  Disaster Recovery and Backup: Cloud solutions provide reliable data backup and disaster 
  recovery options. In the event of a system failure or any disaster, organisations can quickly recover 
  their data without losing valuable information, ensuring business continuity.`,
      isExpanded: false
    },
    {
      id: 2,
      icon: 'assets/images/itsolutions-removebg-preview.png',
      title: 'IT Consulting',
      subtitle: 'IT Consulting',
      description: `Whether you're a startup, small, medium, or large organisation, our journey together begins with a 
  free consultation. We focus on understanding your unique needs and preferences, as well as your 
  future expansion plans. Our team provides comprehensive solutions from start to finish, ensuring 
  seamless integration and execution. With our expertise in IT consulting, we customise our services 
  to align with your business goals, driving efficiency and growth. 
  
  Partner with us to transform your technology strategies and stay ahead in the competitive market.`,
      isExpanded: false
    },
    {
      id: 3,
      icon: 'assets/images/repair-support-removebg-preview.png',
      title: 'Repair and Support',
      subtitle: 'Repair and Support',
      description: `Our Superior service team comprises highly skilled engineers who are certified by leading 
  brands such as Apple, Microsoft, HP, Dell, and Lenovo, ensuring top-notch software and 
  hardware repair and support.
  
  Rapid Incident Support: Our expertise allows us to provide swift diagnosis and resolution 
  per incident, minimising downtime and ensuring your operations continue smoothly.
  
  Comprehensive Annual Maintenance Contracts: With our annual maintenance 
  contracts, you can expect ongoing, reliable support tailored to prevent and address issues 
  promptly, enhancing the productivity of your business.
  
  Dedicated On-Premise Engineer: Benefit from having a dedicated engineer on-site who 
  is familiar with your systems, ensuring immediate support and personalised service for any 
  technical needs.
  
  Scheduled Free Health Checkups: Take advantage of planned health checkups to 
  proactively identify potential issues before they impact your operations, ensuring 
  continuous optimal performance.`,
      isExpanded: false
    },
    {
      id: 4,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Leasing',
      subtitle: 'Leasing',
      description: `Leasing technology equipment enables organisations to access the latest technology 
  without incurring a significant upfront cost, and offers flexibility for upgrades. It generally 
  includes maintenance and support services to keep the equipment in optimal condition. At 
  the end of the lease, organisations have the option to return the equipment, continue 
  leasing, or purchase it, which helps in managing cash flow and aligning expenses with 
  usage.
  
  Benefits to Organisations:
  
  Cost Management: Leasing avoids the substantial initial cost associated with purchasing 
  IT devices, allowing businesses to conserve capital for other operational needs.
  
  Technology Upgrades: Organisations can regularly upgrade to the latest technology 
  without the financial burden of replacing outdated equipment.
  
  Predictable Expenses: Leasing provides fixed monthly payments, making it easier for 
  companies to budget and plan their financials.
  
  Maintenance and Support: Leased IT devices often come with maintenance and support 
  services, reducing the need for in-house technical support and associated costs.
  
  Flexibility and Scalability: Businesses can easily scale their IT infrastructure up or down 
  according to changing needs, without being stuck with obsolete equipment.
  
  Superior Digital collaborates with renowned finance entities like TATA Capital and HP 
  Finance to offer IT equipment on lease.`,
      isExpanded: false
    },
    {
      id: 5,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'IT Lifecycle Management',
      subtitle: 'IT Lifecycle Management',
      description: `Superior Digital oﬀers end-to-end IT Lifecycle Management solutions to help businesses
maximise the value of their technology investments. From procurement and deployment to
maintenance and secure disposal, we manage every stage of your IT assets eﬃciently. Our
approach ensures devices remain secure, up-to-date, and optimised for performance throughout
their lifecycle. With expert support and strategic planning, we help reduce costs, minimise
downtime, and enhance productivity. Trust Superior Digital to keep your IT infrastructure reliable,
scalable, and future-ready.`,
      isExpanded: false
    },
    {
      id: 6,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'IT Assets Insurance',
      subtitle: 'IT Assets Insurance',
      description: `Superior Digital partners with leading insurance providers to oﬀer comprehensive IT Assets
Insurance solutions for organisations. We help protect your valuable IT infrastructure against theft,
damage, accidental loss, and unforeseen risks. Our tailored insurance plans ensure business
continuity and peace of mind, no matter the scale of your operations. With streamlined claim
processes and expert guidance, we make asset protection simple and stress-free. Safeguard your
technology investments with Superior Digital's trusted insurance partnerships.`,
      isExpanded: false
    },
    {
      id: 7,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Warehousing Solutions',
      subtitle: 'Warehousing Solutions',
      description: `Superior Digital is proud to oﬀer expert Warehousing Solutions tailored to meet your business
needs. Whether it's short-term storage or long-term inventory management, we provide secure,
organised, and scalable warehousing options. Our experienced team ensures seamless handling,
tracking, and distribution of your IT assets. We're just a call away to meet you in person,
understand your requirements, and design an eﬀective solution. Partner with Superior Digital for
reliable, eﬃcient, and customised warehousing support.`,
      isExpanded: false
    },
    {
      id: 8,
      icon: 'assets/images/asset_management.png',
      title: 'Supply Chain',
      subtitle: 'Supply Chain',
      description: `Superior Digital oﬀers comprehensive Operational and Supply Chain Services to streamline your
business processes and enhance eﬃciency. From procurement and logistics to inventory
management and last-mile delivery, we ensure every link in your supply chain is optimised. Our
solutions are designed to reduce costs, minimise delays, and improve overall operational
performance. With real-time tracking and dedicated support, you gain full visibility and control
over your supply chain. Let Superior Digital be your trusted partner in driving seamless and
scalable operations.`,
      isExpanded: false
    },
    {
      id: 9,
      icon: 'assets/images/asset_management.png',
      title: 'Asset Management',
      subtitle: 'Asset Management',
      description: `Superior Digital is committed to delivering reliable Asset Management services that keep your IT
infrastructure organised and eﬃcient. We provide detailed Inventory Reports, ensuring accurate
tracking and visibility of all your devices. Our service includes Device Diagnostics during
Reverse Pickup, helping identify issues quickly and reduce downtime. Comprehensive
Reporting keeps you informed at every stage, from deployment to recovery. With Superior Digital,
managing your IT assets becomes seamless, transparent, and hassle-free.`,
      isExpanded: false
    },
    {
      id: 10,
      icon: 'assets/images/asset_management.png',
      title: 'Asset Tagging',
      subtitle: 'Asset Tagging',
      description: `Superior Digital oﬀers precise and professional Asset Tagging services to help you track and
manage your IT equipment eﬀortlessly. Each asset is tagged with a unique identifier, enabling
easy monitoring, maintenance, and auditing. Our tagging solutions support better inventory
control, loss prevention, and compliance with organisational policies. Whether it's during
deployment or ongoing operations, we ensure accurate tagging and data recording. Trust
Superior Digital to bring structure and visibility to your asset management process.`,
      isExpanded: false
    }
  ];

    ngOnInit() {
    this.updateRotation(0);
    this.selecteSolution(1);
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

    this.animateNumbers();
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
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
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

    @HostListener('wheel', ['$event'])
    onWheel(event: WheelEvent) {
      // Check if the event target is within the our-solutions_web section
      const ourSolutionsWeb = document.querySelector('.our-solutions_web');
      if (ourSolutionsWeb?.contains(event.target as Node)) {
        // Allow slow rotation when over our-solutions_web
        event.preventDefault();
        
        // Set very slow rotation speed for our-solutions_web area
        const rotationSpeed = 0.1; // Very slow rotation
        const deltaY = event.deltaY * rotationSpeed;
        
        // Update the rotation angle with the reduced speed
        this.currentRotation += deltaY;
        
        // Apply the rotation to the floating icons container
        const iconsContainer = document.querySelector('.solution-wheel .floating-icons') as HTMLElement;
        if (iconsContainer) {
          iconsContainer.style.transform = `rotate(${this.currentRotation}deg)`;
          
          // Rotate each icon in the opposite direction to keep them upright
          const icons = iconsContainer.querySelectorAll('.floating-icon') as NodeListOf<HTMLElement>;
          icons.forEach(icon => {
            icon.style.transform = `rotate(${-this.currentRotation}deg)`;
          });

          // Calculate which icon should be selected based on rotation
          const degreesPerIcon = 360 / this.TOTAL_SOLUTIONS;
          let currentIndex = Math.round((this.currentRotation % 360) / degreesPerIcon);
          
          // Adjust for negative rotation
          if (currentIndex < 0) {
            currentIndex = this.TOTAL_SOLUTIONS + (currentIndex % this.TOTAL_SOLUTIONS);
          }
          
          // Convert to 1-based index and handle wrap-around
          let nextIndex = (currentIndex % this.TOTAL_SOLUTIONS) + 1;
          
          // Update the selected solution if it has changed
          if (nextIndex !== this.lastSolutionIndex) {
            this.lastSolutionIndex = nextIndex;
            this.selecteSolution(nextIndex);
          }

          // Calculate slow page scroll
          const scrollSpeed = 0.1; // Very slow scroll speed
          const scrollAmount = event.deltaY * scrollSpeed;
          
          // Smoothly scroll the page
          window.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }
        return;
      }

      // Check if the event target is within the service content section
      const serviceContent = document.querySelector('.service-content');
      if (serviceContent?.contains(event.target as Node)) {
        // Allow slow rotation when over service content
        event.preventDefault();
        
        // Reduce the rotation speed even more for service content area
        const rotationSpeed = 0.1; // Further reduced for very slow rotation
        const deltaY = event.deltaY * rotationSpeed;
        
        // Update the rotation angle with the reduced speed
        this.currentRotation += deltaY;
        
        // Apply the rotation to the floating icons container
        const iconsContainer = document.querySelector('.solution-wheel .floating-icons') as HTMLElement;
        if (iconsContainer) {
          iconsContainer.style.transform = `rotate(${this.currentRotation}deg)`;
          
          // Rotate each icon in the opposite direction to keep them upright
          const icons = iconsContainer.querySelectorAll('.floating-icon') as NodeListOf<HTMLElement>;
          icons.forEach(icon => {
            icon.style.transform = `rotate(${-this.currentRotation}deg)`;
          });

          // Calculate which icon should be selected based on rotation
          const degreesPerIcon = 360 / this.TOTAL_SOLUTIONS;
          let currentIndex = Math.round((this.currentRotation % 360) / degreesPerIcon);
          
          // Adjust for negative rotation
          if (currentIndex < 0) {
            currentIndex = this.TOTAL_SOLUTIONS + (currentIndex % this.TOTAL_SOLUTIONS);
          }
          
          // Convert to 1-based index and handle wrap-around
          let nextIndex = (currentIndex % this.TOTAL_SOLUTIONS) + 1;
          
          // Update the selected solution if it has changed
          if (nextIndex !== this.lastSolutionIndex) {
            this.lastSolutionIndex = nextIndex;
            this.selecteSolution(nextIndex);
          }

          // Calculate slow page scroll
          const scrollSpeed = 0.1; // Very slow scroll speed
          const scrollAmount = event.deltaY * scrollSpeed;
          
          // Smoothly scroll the page
          window.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }
        return;
      }

      // Check if the event target is within the solution wheel section
      const solutionWheel = document.querySelector('.solution-wheel');
      if (solutionWheel?.contains(event.target as Node)) {
        // Only prevent default and handle rotation if we're over the solution wheel
        event.preventDefault();
        
        // Reduce the rotation speed and make it smoother
        const rotationSpeed = 0.1; // Further reduced for smoother rotation
        const deltaY = event.deltaY * rotationSpeed;
        
        // Update the rotation angle with the reduced speed
        this.currentRotation += deltaY;
        
        // Apply the rotation to the floating icons container
        const iconsContainer = document.querySelector('.solution-wheel .floating-icons') as HTMLElement;
        if (iconsContainer) {
          iconsContainer.style.transform = `rotate(${this.currentRotation}deg)`;
          
          // Rotate each icon in the opposite direction to keep them upright
          const icons = iconsContainer.querySelectorAll('.floating-icon') as NodeListOf<HTMLElement>;
          icons.forEach(icon => {
            icon.style.transform = `rotate(${-this.currentRotation}deg)`;
          });

          // Calculate which icon should be selected based on rotation
          const degreesPerIcon = 360 / this.TOTAL_SOLUTIONS;
          let currentIndex = Math.round((this.currentRotation % 360) / degreesPerIcon);
          
          // Adjust for negative rotation
          if (currentIndex < 0) {
            currentIndex = this.TOTAL_SOLUTIONS + (currentIndex % this.TOTAL_SOLUTIONS);
          }
          
          // Convert to 1-based index and handle wrap-around
          let nextIndex = (currentIndex % this.TOTAL_SOLUTIONS) + 1;
          
          // Update the selected solution if it has changed
          if (nextIndex !== this.lastSolutionIndex) {
            this.lastSolutionIndex = nextIndex;
            this.selecteSolution(nextIndex);
          }

          // Calculate slow page scroll
          const scrollSpeed = 0.1; // Very slow scroll speed
          const scrollAmount = event.deltaY * scrollSpeed;
          
          // Smoothly scroll the page
          window.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }

    images: string[] = [
        'assets/images/marquee/hexnode_new.png',
        'assets/images/marquee/42Gears-logo.png',
        'assets/images/marquee/logitech-logo.png',
        'assets/images/marquee/alogic.png',
        'assets/images/marquee/belkin.png',
        'assets/images/marquee/honeywell-logo.png',
        'assets/images/marquee/jabra.png',
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
    loop: true,
    margin: 30,
    nav: false,
		mouseDrag: true,
    items: 1,
		dots: false,
		autoHeight: true,
		autoplay: true,
		smartSpeed: 800,
		autoplayHoverPause: true,
		center: false,
    responsive: {
      0: {
        items: 1,
				margin: 10,
			},
      576: {
        items: 1,
			},
      768: {
        items: 2,
				margin: 20,
			},
      992: {
        items: 2,
      },
      1200: {
        items: 2,
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
          description: 'Brands',
          currentValue: 0,
          targetValue: 50
        },
        {
          icon: 'assets/icons/expertise.svg',
          title: '10+',
          description: 'Certified Staff',
          currentValue: 0,
          targetValue: 10
        },
        {
          icon: 'assets/icons/people.svg',
          title: '1500+',
          description: 'Corporate Customers',
          currentValue: 0,
          targetValue: 1500
        },
        {
          icon: 'assets/icons/map.svg',
          title: 'Pan India',
          description: 'support',
          currentValue: 0,
          targetValue: 0
        },
        {
          icon: 'assets/icons/device.svg',
          title: '3,00,000+',
          description: 'Devices Deployed',
          currentValue: 0,
          targetValue: 300000
        }
      ];

      onSubmit() {
        if (this.contactForm.valid) {
          console.log('Form submitted:', this.contactForm.value);
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
        } else {
          // Mark all fields as touched to trigger validation display
          Object.keys(this.contactForm.controls).forEach(key => {
            const control = this.contactForm.get(key);
            control?.markAsTouched();
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
      /* toggleReadMore(): void {
        this.isExpanded = !this.isExpanded;
      } */

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
      this.circleOpacity = 1;
    }
  }

  onCardHover(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  startAutoScroll() {
    if (!this.isHovered) {
      this.autoScrollInterval = setInterval(() => {
        const container = this.cardContainer.nativeElement;
        const scrollAmount = container.clientWidth;
        container.scrollLeft += scrollAmount;
        
        // Reset to start if reached end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollLeft = 0;
        }
      }, 5000); // Scroll every 5 seconds
    }
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
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

  private updateRotation(rotation: number) {
    const iconsContainer = document.querySelector('.floating-icons') as HTMLElement;
    const icons = document.querySelectorAll('.floating-icon') as NodeListOf<HTMLElement>;

    if (iconsContainer) {
      iconsContainer.style.transform = `rotate(${rotation}deg)`;

      icons.forEach(icon => {
        icon.style.transform = `rotate(${-rotation}deg)`;
      });
    }
  }

  private updateselectedSolutionSequentially(direction: number) {
    // Calculate next service index based on direction
    let nextIndex = this.lastSolutionIndex + direction;

    // Handle wrapping around
    if (nextIndex > this.TOTAL_SOLUTIONS) {
      nextIndex = 1;
    } else if (nextIndex < 1) {
      nextIndex = this.TOTAL_SOLUTIONS;
    }

    // Only update if enough rotation has occurred
    const rotationThreshold = Math.abs(this.currentRotation % this.DEGREES_PER_SOLUTIONS);
    if (rotationThreshold > this.DEGREES_PER_SOLUTIONS / 2) {
      this.lastSolutionIndex = nextIndex;
      this.selecteSolution(nextIndex);
    }
  }

  
  toggleDescription() {
    if (this.selectedSolution) {
      this.selectedSolution.isExpanded = !this.selectedSolution.isExpanded;
      
      // Reset scroll position when collapsing description
      if (!this.selectedSolution.isExpanded) {
        this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      }
    }
  }

  selecteSolution(id: number) {
    const solution = this.Solutions.find(solution => solution.id === id);
    if (solution) {
      // Reset expansion state of previous service if different
      if (this.selectedSolution && this.selectedSolution.id !== solution.id) {
        this.selectedSolution.isExpanded = false;
      }
      this.selectedSolution = solution;
    } else {
      this.selectedSolution = null;
    }
  }

  onCardClick() {
    this.stopAutoScroll();
    // Resume auto-scroll after 5 seconds
    this.scrollTimeout = setTimeout(() => {
      this.startAutoScroll();
    }, 5000);
      }

  animateNumbers() {
    const duration = 5000; // Changed from 3000 to 5000 (5 seconds)
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      this.cardItems.forEach(item => {
        if (item.targetValue > 0) {
          item.currentValue = Math.floor(progress * item.targetValue);
        }
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  // Getter for easy access in template
  get emailControl() {
    return this.contactForm.get('email');
  }

  // Email validation error messages
  getEmailErrorMessage() {
    if (this.emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (this.emailControl?.hasError('pattern')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  // Getter for mobile control
  get mobileControl() {
    return this.contactForm.get('mobile');
  }

  // Mobile validation error messages
  getMobileErrorMessage() {
    if (this.mobileControl?.hasError('required')) {
      return 'Mobile number is required';
    }
    if (this.mobileControl?.hasError('pattern') || 
        this.mobileControl?.hasError('minLength') || 
        this.mobileControl?.hasError('maxLength')) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return '';
      }

  public scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
