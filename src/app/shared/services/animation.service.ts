import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private readonly observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };

  createIntersectionObserver(
    element: Element,
    callback: IntersectionObserverCallback
  ): IntersectionObserver | null {
    if (
      isPlatformBrowser(this.platformId) &&
      'IntersectionObserver' in window
    ) {
      return new IntersectionObserver(callback, this.observerOptions);
    }
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return null;
  }
}
