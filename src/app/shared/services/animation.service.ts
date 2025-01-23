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

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const section = document.getElementById(sectionId);
      if (section) {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;

        let offset = 120;
        if (isMobile) {
          offset = 80;
        } else if (isTablet) {
          offset = 100;
        }

        const headerHeight =
          document.querySelector('header')?.offsetHeight || 0;
        const sectionPosition = section.getBoundingClientRect().top;
        const offsetPosition =
          sectionPosition + window.pageYOffset - headerHeight - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }

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
    return null;
  }
}
