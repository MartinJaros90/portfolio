import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/component/header/header.component';
import { HeroSectionComponent } from './about/hero-section/hero-section.component';
import { AboutMeComponent } from './about/about-me/about-me.component';
import { SkillsComponent } from './about/skills/skills.component';
import { PortfolioShowcaseComponent } from './portfolio-showcase/portfolio-showcase.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './shared/component/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HeroSectionComponent,
    AboutMeComponent,
    SkillsComponent,
    PortfolioShowcaseComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
}
