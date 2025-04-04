import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  icon: string;
  title: string;
  transform: string;
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
    { icon: 'assets/infographics/service1.png', title: 'Audio & Video Solutions', transform: '' },
    { icon: 'assets/infographics/service2.png', title: 'IT Consulting', transform: '' },
    { icon: 'assets/infographics/service3.png', title: 'Cloud Solutions', transform: '' },
    { icon: 'assets/infographics/service4.png', title: 'Networking', transform: '' },
    { icon: 'assets/infographics/service5.png', title: 'Leasing', transform: '' }
  ];

  selectedService: ServiceItem | null = null;

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
}
