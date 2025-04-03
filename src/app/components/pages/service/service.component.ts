import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  contactForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      device: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    emailjs.init("PTmfxUAnOlAZlyhRB");
  }

  devices = ['MacBook Air',
    'MacBook Pro',
    'iMac',
    'Mac Mini',
    'Mac Studio',
    'Mac Pro',
    'iPad',
    'iPhone',
    'Apple Watch',
    'Airpods',
    'Other Accessories',
  ];

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.contactForm.valid) {
      emailjs.send("service_kuiothp", "template_xa36knk", {
        to_name: "SDPL",
        from_name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        device: this.contactForm.value.device,
        message: this.contactForm.value.message,
        reply_to: this.contactForm.value.email,
      })
        .then((response) => {
          this.message = 'Message sent successfully!';
          this.contactForm.reset();
        })
        .catch((error) => {
          this.message = 'Error sending message. Try again later.';
        });
    }
  }
}
