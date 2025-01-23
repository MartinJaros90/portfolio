import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Nl2brPipe } from '../../shared/pipes/nl2br.pipe';
import { ViewportScroller } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, Nl2brPipe],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent implements OnInit {
  lastUpdated = '18.01.2025';

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  navigateBack() {
    const savedPosition = sessionStorage.getItem('scrollPosition');

    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        if (savedPosition) {
          window.scrollTo({
            top: parseInt(savedPosition),
            behavior: 'smooth',
          });
        }
      }, 100);
    });
  }
}
