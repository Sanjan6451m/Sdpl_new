import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audiovideo-solutions',
  standalone: true,
  imports: [],
  templateUrl: './audiovideo-solutions.component.html',
  styleUrl: './audiovideo-solutions.component.scss'
})
export class AudiovideoSolutionsComponent implements OnInit  {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(link);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  
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
}
