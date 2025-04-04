import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dummy-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.scss'
})
export class DummyPageComponent {
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
}
