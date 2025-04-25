import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [],
  templateUrl: './logistics.component.html',
  styleUrl: './logistics.component.scss'
})
export class LogisticsComponent implements OnInit {
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

}
