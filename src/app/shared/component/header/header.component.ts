import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  activeSection: string = '';
  isMenuOpen = false;
  isScrolled = false;
  isHeaderVisible = true;
  lastScrollTop = 0;
  isAnimating = false;
  currentLanguage: 'de' | 'en' = 'en';
  currentLanguageIcon = '../../../../assets/icons/en-active.png';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private languageService: LanguageService
  ) {
    this.languageService.currentLang$.subscribe((lang) => {
      this.currentLanguage = lang as 'de' | 'en';
      this.currentLanguageIcon =
        lang === 'en'
          ? '../../../../assets/icons/en-active.png'
          : '../../../../assets/icons/de-active.png';
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkActiveSection();
      window.addEventListener('scroll', () => {
        this.checkActiveSection();
        this.handleScroll();
      });
    }
  }

  private handleScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentScroll = window.pageYOffset;
      this.isScrolled = currentScroll > 50;
      this.isHeaderVisible =
        currentScroll < this.lastScrollTop || currentScroll < 50;
      this.lastScrollTop = currentScroll;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguage(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const newLang = this.currentLanguage === 'en' ? 'de' : 'en';
    this.languageService.switchLanguage(newLang);

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  private checkActiveSection(): void {
    if (isPlatformBrowser(this.platformId)) {
      const sections = ['about', 'skills', 'portfolio'];
      const headerOffset = 150;

      this.activeSection = '';

      if (window.pageYOffset < 100) {
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom > headerOffset) {
            this.activeSection = sectionId;
            break;
          }
        }
      }
    }
  }

  scrollToSection(sectionId: string, event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      if (this.isMenuOpen) {
        this.toggleMenu();
      }
    }
  }
}
