import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import emailjs from 'emailjs-com';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './rsvp-page.component.html',
  styleUrl: './rsvp-page.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RsvpPageComponent {
  rsvp = {
    name: '',
    email: '',
    guests: 0,
    message: '',
    attending: false
  };

  constructor(private router: Router) {}

  onSubmit() {
    const templateParams = {
      name: this.rsvp.name,
      email: this.rsvp.email,
      guests: this.rsvp.guests,
      message: this.rsvp.message,
      attending: this.rsvp.attending,
    };

    emailjs.send('service_4qsams9', 'template_bf0d1og', templateParams, 'vnHVnD1YNPRX0wssx')
      .then((response) => {
        console.log('Email sent successfully', response.status, response.text);
        this.router.navigate(['/home']);
      }, (error) => {
        console.error('Failed to send email', error);
      });
  }
}