import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  email: string = 'martinjaros88@gmail.com';
  githubUrl: string = 'https://github.com/MartinJaros90';

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    let element = document.getElementById(sectionId);
    if (element) {
      let headerOffset = 100;
      let elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  openGithub() {
    window.open(this.githubUrl, '_blank');
  }
}
