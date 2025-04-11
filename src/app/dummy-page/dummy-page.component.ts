import { Component, OnInit, ElementRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
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
  selectedService: Service | null = null;

  services: Service[] = [
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
  ];

  constructor() { }

  ngOnInit(): void {
    this.updateRotation(0);
    // Select first service by default
    this.selectService(1);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollPosition - this.lastScrollPosition;
    
    this.currentRotation += scrollDelta * this.ROTATION_SPEED;
    this.updateRotation(this.currentRotation);
    
    // Calculate which service should be selected based on rotation
    this.updateSelectedServiceFromRotation();
    
    this.lastScrollPosition = currentScrollPosition;
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

  private updateSelectedServiceFromRotation() {
    // Normalize rotation to 0-360 degrees
    const normalizedRotation = ((this.currentRotation % 360) + 360) % 360;
    
    // Calculate which service should be at the top position
    const serviceIndex = Math.floor(normalizedRotation / this.DEGREES_PER_SERVICE) + 1;
    
    // Ensure the index is within bounds (1-9)
    const adjustedIndex = ((serviceIndex - 1) % this.TOTAL_SERVICES) + 1;
    
    // Only update if the service is different
    if (this.selectedService?.id !== adjustedIndex) {
      this.selectService(adjustedIndex);
    }
  }

  selectService(id: number) {
    this.selectedService = this.services.find(service => service.id === id) || null;
  }
}
