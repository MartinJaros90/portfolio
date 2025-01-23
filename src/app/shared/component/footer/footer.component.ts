import { Component, HostListener } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, CommonModule, RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isVisible = false;

  constructor(private translate: TranslateService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
