import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HeartAnimationComponent } from '@app/components/heart-animation/heart-animation.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [CommonModule, HeartAnimationComponent],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MainPageComponent implements OnInit {
  weddingDate = new Date('2025-07-20');
  countdown: { days: number; hours: number; minutes: number; seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  ngOnInit() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.weddingDate.getTime() - now;

    this.countdown = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }
}