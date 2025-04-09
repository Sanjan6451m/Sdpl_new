import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-networking',
  standalone: true,
  imports: [],
  templateUrl: './networking.component.html',
  styleUrl: './networking.component.scss'
})
export class NetworkingComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
