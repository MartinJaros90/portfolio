import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { AnimationService } from '../services/animation.service';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(
    private element: ElementRef,
    private animationService: AnimationService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // Verzögere die Initialisierung um sicherzustellen, dass wir im Browser-Kontext sind
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        if (this.element.nativeElement) {
          this.element.nativeElement.classList.add('scroll-hidden');
        }

        this.observer = this.animationService.createIntersectionObserver(
          this.element.nativeElement,
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('scroll-show');
                if (this.observer) {
                  this.observer.unobserve(entry.target);
                }
              }
            });
          }
        );

        if (this.observer && this.element.nativeElement) {
          this.observer.observe(this.element.nativeElement);
        }
      }, 0);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
