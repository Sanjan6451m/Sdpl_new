import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobility',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobility.component.html',
  styleUrl: './mobility.component.scss'
})
export class MobilityComponent {
  @ViewChild('cardsContainer', { static: false }) cardsContainer!: ElementRef;
  activeIndex = 0;
  cards = [
    { title: 'Increased Productivity', description: 'Enable your team to work more efficiently with instant access to the tools and information they need, no matter where they are.' },
    { title: 'Improved Collaboration', description: 'Foster better communication and collaboration among teams with seamless connectivity and sharing platforms.' },
    { title: 'Cost Efficiency', description: 'Reduce operational costs by streamlining processes and eliminating unnecessary manual tasks.' },
    { title: 'Enhanced Customer Experience', description: 'Provide your customers with a seamless and responsive service experience, enhancing satisfaction and loyalty.' },
    { title: 'Competitive Advantage', description: 'Stay ahead of the competition with cutting-edge technology that keeps your business agile and innovative.' }
  ];

  /**
   * Toggles the accordion item's expanded state
   * @param event The click event
   */
  toggleAccordion(event: MouseEvent): void {
    const header = event.currentTarget as HTMLElement;
    const item = header.parentElement;
    
    if (item) {
      // Toggle active class on the clicked item
      item.classList.toggle('active');
      
      // Get the content element
      const content = header.nextElementSibling as HTMLElement;
      
      // Toggle display
      if (content) {
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }
      }
    }
  }

 
  goToSlide(index: number) {
    this.activeIndex = index;
    const container = this.cardsContainer.nativeElement;
    const cardWidth = container.offsetWidth / 3; // Assuming 3 cards are visible at a time
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
  }
}
