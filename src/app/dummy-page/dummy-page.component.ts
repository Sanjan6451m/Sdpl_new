import { Component, OnInit, ElementRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Solutionweb {
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

  constructor() { }

  ngOnInit(): void {
    this.updateRotation(0);
    this.selecteSolution(1);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    
    // Reduce the rotation speed by dividing the delta by a larger number
    const rotationSpeed = 0.1; // Decreased from default
    const deltaY = event.deltaY * rotationSpeed;
    
    // Update the rotation angle with the reduced speed
    this.currentRotation += deltaY;
    
    // Apply the rotation to the floating icons container
    const iconsContainer = document.querySelector('.floating-icons') as HTMLElement;
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
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Don't rotate if description is expanded
    if (this.selectedSolution?.isExpanded) {
      return;
    }

    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollPosition - this.lastScrollPosition;
    
    // Update rotation based on scroll direction
    this.currentRotation += scrollDelta * this.ROTATION_SPEED;
    
    // Determine scroll direction (-1 for up, 1 for down)
    const direction = scrollDelta > 0 ? 1 : -1;
    
    // Calculate next service index based on current selection and direction
    let nextIndex = this.lastSolutionIndex + direction;
    
    // Handle wrapping around
    if (nextIndex > this.TOTAL_SOLUTIONS) {
      nextIndex = 1;
    } else if (nextIndex < 1) {
      nextIndex = this.TOTAL_SOLUTIONS;
    }
    
    // Update the rotation visually
    this.updateRotation(this.currentRotation);
    
    // Only update selection if we've scrolled enough
    if (Math.abs(scrollDelta) > 5) {
      this.lastSolutionIndex = nextIndex;
      this.selecteSolution(nextIndex);
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
}
