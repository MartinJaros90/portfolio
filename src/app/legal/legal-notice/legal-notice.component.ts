import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Nl2brPipe } from '../../shared/pipes/nl2br.pipe';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, Nl2brPipe],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent implements OnInit {
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
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
