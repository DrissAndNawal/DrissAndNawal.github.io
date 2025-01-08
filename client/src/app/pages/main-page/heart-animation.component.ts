import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-heart-animation',
  standalone: true,
  template: `
    <div class="hearts-container">
    </div>
  `,
  styles: [`
    .hearts-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1000;
    }

    :host ::ng-deep .heart {
      position: fixed;
      font-size: 1.5rem;
      top: -1vh;
      transform: translateY(0);
      animation: fall 6s linear forwards;
    }

    @keyframes fall {
      from {
        transform: translateY(0vh) translateX(-10vw);
      }
      to {
        transform: translateY(105vh) translateX(10vw);
      }
    }
  `]
})
export class HeartAnimationComponent implements OnInit, OnDestroy {
  private interval: any;

  ngOnInit() {
    this.interval = setInterval(() => this.createHeart(), 800);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 5 + "s";
    
    heart.innerText = '💗';
    
    const container = document.querySelector('.hearts-container');
    if (container) {
      container.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 8000);
    }
  }
}