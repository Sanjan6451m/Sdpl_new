import { Component, OnInit, ElementRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-dummy-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.scss'
})
export class DummyPageComponent implements OnInit {
  private lastScrollPosition = 0;
  private currentRotation = 0;
  private readonly ROTATION_SPEED = 2;
  private readonly TOTAL_SERVICES = 9;
  private readonly DEGREES_PER_SERVICE = 360 / this.TOTAL_SERVICES;
  private lastServiceIndex = 1;
  selectedService: Service | null = null;
  defaultDescription = 'Each enterprise customer is assigned an Account Manager as their single point of contact for after-sales support, additional procurement, and value-added services. With quick turnaround times, proactive support, and priority service, we ensure an exceptional customer experience. Dedicated CRM and purchase/support portals are available upon request for 24/7 convenience. Our team prioritizes customer data security at every step.';


  services: Service[] = [
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
      id: 6,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'IT Assets Insurance',
      subtitle: 'IT Assets Insurance',
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
      id: 7,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Warehousing Solutions',
      subtitle: 'Warehousing Solutions',
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
      id: 8,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Operational / Supply Chain Services',
      subtitle: 'Operational / Supply Chain Services',
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
      id: 9,
      icon: 'assets/images/leaseing-removebg-preview.png',
      title: 'Asset Management',
      subtitle: 'Asset Management',
      description: `Leasing technology equipment enables organisations to access the latest technology 
without incurring a significant upfront cost, and offers flexibility for upgrades. It generally 
includes maintenance and support services to keep the equipment in optimal condition. At 
the end of the lease, organisations have the option to return the equipment, continue 
leasing, or purchase it, which helps in managing cash flow and aligning expenses with 
usage.`,
      isExpanded: false
    }
  ];

  /* services1: Service[] = [
    {
      id: 1,
      title: 'Life Cycle Management',
      subtitle: 'Complete Device Management Solution',
      description: 'Our Life Cycle Management service provides end-to-end device management solutions, from procurement to retirement. We ensure optimal device performance and security throughout their lifecycle.'
    },
    {
      id: 2,
      title: 'IT Solutions',
      subtitle: 'Comprehensive IT Infrastructure',
      description: 'Custom IT solutions designed to meet your business needs. From network setup to software implementation, we provide complete IT infrastructure management.'
    },
    {
      id: 3,
      title: 'Repair & Support',
      subtitle: 'Expert Technical Assistance',
      description: 'Professional repair and support services for all your IT equipment. Our certified technicians provide quick turnaround times and reliable solutions.'
    },
    {
      id: 4,
      title: 'Leasing',
      subtitle: 'Flexible Device Leasing Options',
      description: 'Cost-effective leasing solutions for your IT equipment needs. Get access to the latest technology without the burden of ownership.'
    },
    {
      id: 5,
      title: 'Service 5',
      subtitle: 'Service 5 Subtitle',
      description: 'Description for Service 5 goes here.'
    },
    {
      id: 6,
      title: 'Service 6',
      subtitle: 'Service 6 Subtitle',
      description: 'Description for Service 6 goes here.'
    },
    {
      id: 7,
      title: 'Service 7',
      subtitle: 'Service 7 Subtitle',
      description: 'Description for Service 7 goes here.'
    },
    {
      id: 8,
      title: 'Service 8',
      subtitle: 'Service 8 Subtitle',
      description: 'Description for Service 8 goes here.'
    },
    {
      id: 9,
      title: 'Service 9',
      subtitle: 'Service 9 Subtitle',
      description: 'Description for Service 9 goes here.'
    }
  ]; */

  constructor() { }

  ngOnInit(): void {
    this.updateRotation(0);
    this.selectService(1);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Don't rotate if description is expanded
    if (this.selectedService?.isExpanded) {
      return;
    }

    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollPosition - this.lastScrollPosition;
    
    // Update rotation based on scroll direction
    this.currentRotation += scrollDelta * this.ROTATION_SPEED;
    
    // Determine scroll direction (-1 for up, 1 for down)
    const direction = scrollDelta > 0 ? 1 : -1;
    
    // Calculate next service index based on current selection and direction
    let nextIndex = this.lastServiceIndex + direction;
    
    // Handle wrapping around
    if (nextIndex > this.TOTAL_SERVICES) {
      nextIndex = 1;
    } else if (nextIndex < 1) {
      nextIndex = this.TOTAL_SERVICES;
    }
    
    // Update the rotation visually
    this.updateRotation(this.currentRotation);
    
    // Only update selection if we've scrolled enough
    if (Math.abs(scrollDelta) > 5) {
      this.lastServiceIndex = nextIndex;
      this.selectService(nextIndex);
      this.lastScrollPosition = currentScrollPosition;
    }
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

  private updateSelectedServiceSequentially(direction: number) {
    // Calculate next service index based on direction
    let nextIndex = this.lastServiceIndex + direction;
    
    // Handle wrapping around
    if (nextIndex > this.TOTAL_SERVICES) {
      nextIndex = 1;
    } else if (nextIndex < 1) {
      nextIndex = this.TOTAL_SERVICES;
    }
    
    // Only update if enough rotation has occurred
    const rotationThreshold = Math.abs(this.currentRotation % this.DEGREES_PER_SERVICE);
    if (rotationThreshold > this.DEGREES_PER_SERVICE / 2) {
      this.lastServiceIndex = nextIndex;
      this.selectService(nextIndex);
    }
  }

 /*  selectService(id: number) {
    this.selectedService = this.services.find(service => service.id === id) || null;
  } */

  toggleDescription() {
    if (this.selectedService) {
      this.selectedService.isExpanded = !this.selectedService.isExpanded;
      
      // Reset scroll position when collapsing description
      if (!this.selectedService.isExpanded) {
        this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      }
    }
  }

  selectService(id: number) {
    const service = this.services.find(service => service.id === id);
    if (service) {
      // Reset expansion state of previous service if different
      if (this.selectedService && this.selectedService.id !== service.id) {
        this.selectedService.isExpanded = false;
      }
      this.selectedService = service;
    } else {
      this.selectedService = null;
    }
  }
}
