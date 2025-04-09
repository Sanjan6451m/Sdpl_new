import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-mobility',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobility.component.html',
  styleUrl: './mobility.component.scss'
})
export class MobilityComponent implements OnInit {
  @ViewChild('cardsContainer', { static: false }) cardsContainer!: ElementRef;
  @ViewChild('gridContainer') gridContainer!: ElementRef;
  activeIndex = 0;
  activeIndexgrid = 0;
  slideInterval: any;
  cards = [
    { title: 'Increased Productivity', description: 'Enable your team to work more efficiently with instant access to the tools and information they need, no matter where they are.' },
    { title: 'Improved Collaboration', description: 'Foster better communication and collaboration among teams with seamless connectivity and sharing platforms.' },
    { title: 'Cost Efficiency', description: 'Reduce operational costs by streamlining processes and eliminating unnecessary manual tasks.' },
    { title: 'Enhanced Customer Experience', description: 'Provide your customers with a seamless and responsive service experience, enhancing satisfaction and loyalty.' },
    { title: 'Competitive Advantage', description: 'Stay ahead of the competition with cutting-edge technology that keeps your business agile and innovative.' }
  ];
  gridItems = [
    { title: 'Seamless Integration', description: 'Our solutions easily integrate with existing enterprise systems and platforms, ensuring a smooth transition and minimal disruption to your operations.', image: 'assets/images/seamless_integration.jpeg' },
    { title: 'Enhanced Security', description: 'Protecting your data is our top priority. We offer advanced security features, including encryption, multi-factor authentication, and remote wipe capabilities, to safeguard sensitive information against cyber threats.', image: 'assets/images/enhance_security.jpeg' },
    { title: 'Customisable Applications', description: 'We provide a range of customisable mobile applications designed to streamline workflows and increase operational efficiency. These applications are intuitive and user friendly, requiring minimal training and support.', image: 'assets/images/custom_application.jpeg' },
    { title: 'Real-time Analytics', description: 'Gain insights into your business operations with real-time data analytics. Our solutions offer detailed reports and analytics to help you make informed decisions and stay ahead of the competition.', image: 'assets/images/realtimeanalysis.jpeg' },
    { title: 'Scalable Solutions', description: 'As your business grows, our mobility solutions can scale to meet your evolving needs. Whether you\'re expanding your workforce or entering new markets, we have the technology and expertise to support your growth.', image: 'assets/images/scalable.jpeg' }
  ];

  constructor(private router: Router) { }

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

  goToSlidegrid(index: number) {
    this.activeIndexgrid = index;
  }

  scrollLeft() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      const container = this.gridContainer.nativeElement;
      container.scrollBy({
        left: -container.offsetWidth / 1, // Scroll by one tile width
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    if (this.activeIndex < this.gridItems.length - 1) {
      this.activeIndex++;
      const container = this.gridContainer.nativeElement;
      container.scrollBy({
        left: container.offsetWidth / 1, // Scroll by one tile width
        behavior: 'smooth'
      });
    }
  }

  ngOnInit(): void {
    this.startAutoSlide();
    this.gridItems = [...this.gridItems, ...this.gridItems];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.gridItems.length;
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
