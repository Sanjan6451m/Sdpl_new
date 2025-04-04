import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mdm',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mdm.component.html',
  styleUrl: './mdm.component.scss'
})
export class MdmComponent {
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
