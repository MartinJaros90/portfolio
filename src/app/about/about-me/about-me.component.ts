import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule, ScrollAnimationDirective],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {}
