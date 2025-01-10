import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isGerman = true;
  isAnimating = false;
  currentLanguageIcon = '../../../../assets/icons/de-active.png';

  toggleLanguage() {
    this.isAnimating = true;

    setTimeout(() => {
      this.isGerman = !this.isGerman;
      this.currentLanguageIcon = this.isGerman
        ? '../../../../assets/icons/de-active.png'
        : '../../../../assets/icons/en-active.png';
    }, 200);

    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }
}
