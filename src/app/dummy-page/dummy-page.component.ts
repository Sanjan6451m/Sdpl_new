import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  icon: string;
  title: string;
  transform: string;
  description: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
}

@Component({
  selector: 'app-dummy-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.scss'
})
export class DummyPageComponent implements OnInit {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  cards = [
    {
      title: 'Morning Ritual',
      frontContent: 'The perfect start to every day',
      backContent: 'Artisanal coffee blend, carefully crafted for the perfect morning experience',
      image: 'assets/images/client/1.jpg'
    },
    {
      title: 'Fading Beauty',
      frontContent: 'Nature\'s delicate transitions',
      backContent: 'Capturing the ephemeral beauty of wilting flowers',
      image: 'assets/images/client/2.jpg'
    },
    {
      title: 'Light & Shadow',
      frontContent: 'Playing with natural contrasts',
      backContent: 'The interplay of sunlight and shadows in everyday moments',
      image: 'assets/images/client/3.jpg'
    },
    {
      title: 'Urban Details',
      frontContent: 'Finding beauty in simplicity',
      backContent: 'Minimalist perspectives of city life',
      image: 'assets/images/client/4.jpg'
    },
    {
      title: 'Quiet Moments',
      frontContent: 'Peaceful contemplation',
      backContent: 'Finding stillness in the midst of chaos',
      image: 'assets/images/client/5.jpg'
    }
  ];

  services: ServiceItem[] = [
    // { icon: 'assets/infographics/service1.png', title: 'Audio & Video Solutions', transform: '', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' },
    { icon: 'https://ik.imagekit.io/xic57rvk8yp/consultant_OJETVCvZ5W.png?updatedAt=1743764966182', title: 'IT Consulting', transform: '', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' },
    { icon: 'https://ik.imagekit.io/xic57rvk8yp/cloud_n-oQmCmr-.png?updatedAt=1743764966503', title: 'Cloud Solutions', transform: '', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' },
    { icon: 'https://ik.imagekit.io/xic57rvk8yp/repair_ub9f93pCHW.png?updatedAt=1743764966563', title: 'Repair & Support', transform: '', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' },
      { icon: 'https://ik.imagekit.io/xic57rvk8yp/leasing_wKaUgRUuK.png?updatedAt=1743764966653', title: 'Leasing', transform: '', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', description4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' }
  ];

  selectedService: ServiceItem | null = null;
  activeAccordionIndex: number | null = null;

  ngOnInit() {
    this.calculateServiceItemPositions();
  }

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

  scrollLeft() {
    const container = this.cardsContainer.nativeElement;
    container.scrollBy({
      left: -container.offsetWidth,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const container = this.cardsContainer.nativeElement;
    container.scrollBy({
      left: container.offsetWidth,
      behavior: 'smooth'
    });
  }

  selectService(service: ServiceItem) {
    this.selectedService = service;
  }

  toggleAccordion(index: number) {
    this.activeAccordionIndex = this.activeAccordionIndex === index ? null : index;
  }
}
