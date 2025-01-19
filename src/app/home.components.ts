import { Component } from '@angular/core';
import { HeroSectionComponent } from './about/hero-section/hero-section.component';
import { AboutMeComponent } from './about/about-me/about-me.component';
import { SkillsComponent } from './about/skills/skills.component';
import { PortfolioShowcaseComponent } from './portfolio-showcase/portfolio-showcase.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutMeComponent,
    SkillsComponent,
    PortfolioShowcaseComponent,
    ContactComponent,
  ],
  template: `
    <app-hero-section></app-hero-section>
    <app-about-me></app-about-me>
    <app-skills></app-skills>
    <app-portfolio-showcase></app-portfolio-showcase>
    <app-contact></app-contact>
  `,
})
export class HomeComponent {}
