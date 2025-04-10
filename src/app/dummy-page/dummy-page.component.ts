import { Component, OnInit, ElementRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  private readonly ROTATION_SPEED = 2; // Degrees per scroll delta

  constructor() { }

  ngOnInit(): void {
    // Initialize rotation to 0
    this.updateRotation(0);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollPosition - this.lastScrollPosition;
    
    // Update rotation based on scroll direction and amount
    this.currentRotation += scrollDelta * this.ROTATION_SPEED;
    this.updateRotation(this.currentRotation);
    
    this.lastScrollPosition = currentScrollPosition;
  }

  private updateRotation(rotation: number) {
    const iconsContainer = document.querySelector('.floating-icons') as HTMLElement;
    const icons = document.querySelectorAll('.floating-icon') as NodeListOf<HTMLElement>;
    
    if (iconsContainer) {
      iconsContainer.style.transform = `rotate(${rotation}deg)`;
      
      // Counter-rotate each icon to keep them upright
      icons.forEach(icon => {
        icon.style.transform = `rotate(${-rotation}deg)`;
      });
    }
  }
}
