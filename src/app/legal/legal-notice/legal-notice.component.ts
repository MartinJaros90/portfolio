import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
