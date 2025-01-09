import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss'
})
export class RsvpComponent {
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