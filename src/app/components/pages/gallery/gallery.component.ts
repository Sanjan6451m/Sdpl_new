import { Component, OnInit } from '@angular/core';

interface FeatureCard {
  title: string;
  description: string;
  icon?: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  features: FeatureCard[] = [
    {
      title: 'Software Solutions',
      description: 'Custom software development, system integration, and digital transformation solutions tailored to your business needs.',
      icon: 'assets/images/software.svg'
    },
    {
      title: 'Hardware Services',
      description: 'Comprehensive hardware solutions including supply, setup, maintenance, and infrastructure optimization.',
      icon: 'assets/images/hardware.svg'
    },
    {
      title: 'Deployment Services',
      description: 'Expert system deployment and migration services ensuring smooth transition and minimal downtime.',
      icon: 'assets/images/deployment.svg'
    },
    {
      title: 'Repair & Maintenance',
      description: 'Professional repair services and preventive maintenance to keep your systems running at peak performance.',
      icon: 'assets/images/repair.svg'
    },
    {
      title: 'Training Programs',
      description: 'Comprehensive training solutions to empower your team with the latest technology skills and best practices.',
      icon: 'assets/images/training.svg'
    }
  ];
  
  activeIndex = 0;

  ngOnInit(): void {
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.features.length) % this.features.length;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.features.length;
  }
}
