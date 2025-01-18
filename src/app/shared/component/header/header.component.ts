import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isGerman = true;
  isAnimating = false;
  isScrolled = false;
  isHeaderVisible = true;
  lastScrollPosition = 0;
  currentLanguageIcon = '../../../../assets/icons/de-active.png';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }

  private handleScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentScroll = window.scrollY;
      this.isScrolled = currentScroll > 100;

      if (currentScroll > this.lastScrollPosition && currentScroll > 200) {
        this.isHeaderVisible = false;
      } else {
        this.isHeaderVisible = true;
      }

      this.lastScrollPosition = currentScroll;
    }
  }

  toggleLanguage() {
    this.isAnimating = true;

    setTimeout(() => {
      this.isGerman = !this.isGerman;
      this.currentLanguageIcon = this.isGerman
        ? 'assets/icons/de-active.png'
        : 'assets/icons/en-active.png';
    }, 200);

    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }
}
