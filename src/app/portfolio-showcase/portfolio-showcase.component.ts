import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type TechType = 'HTML' | 'CSS' | 'JavaScript' | 'Firebase' | 'Angular';

interface Card {
  number: number;
  id: number;
  name: string;
  about: string;
  ueber: string;
  technologies: string;
  learning: string;
  image: string;
  github: string;
  test: string;
  techIcons?: { [key: string]: string };
}

@Component({
  selector: 'app-portfolio-showcase',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio-showcase.component.html',
  styleUrl: './portfolio-showcase.component.scss',
})
export class PortfolioShowcaseComponent {
  techIconsMap: Record<TechType, string> = {
    HTML: '../../assets/icons/html-overlay.png',
    CSS: '../../assets/icons/css-overlay.png',
    JavaScript: '../../assets/icons/javascript-overlay.png',
    Firebase: '../../assets/icons/firebase-overlay.png',
    Angular: '../../assets/icons/angular-overlay.png',
  };

  selectedProject: string | null = null;

  constructor(private translate: TranslateService) {
    this.language = this.translate.currentLang || 'en';

    // Subscribe to language changes
    this.translate.onLangChange.subscribe((event) => {
      this.language = event.lang;
    });
  }

  language: string = 'en';
  contentForCard: Card[] = [
    {
      number: 1,
      id: 0,
      name: 'Pokédex',
      about:
        'Embark on a journey through the world of Pokémon with this dynamic Pokédex application! Discover detailed information about your favorite Pokémon, explore their abilities, and experience an interactive interface powered by modern web technologies. Currently in development - stay tuned for exciting features!',
      ueber:
        'Begib dich auf eine Reise durch die Welt der Pokémon mit dieser dynamischen Pokédex-Anwendung! Entdecke detaillierte Informationen über deine Lieblings-Pokémon, erkunde ihre Fähigkeiten und erlebe eine interaktive Benutzeroberfläche, die von modernen Webtechnologien angetrieben wird. Aktuell in Entwicklung - freue dich auf spannende Features!',
      technologies: 'HTML, CSS, Firebase, JavaScript',
      learning: 'OOP',
      image: '../../assets/img/pokedex.png',
      github: 'https://github.com/MartinJaros90/Pokedex-API',
      test: 'https://jan-bruchwalski.developerakademie.net/info.html',
    },
    {
      number: 2,
      id: 1,
      name: 'Sharkie',
      about:
        "Take control of Sharkie, a brave shark in this underwater Jump'n Run adventure! Navigate through ocean depths, dodge enemies, and collect items in this JavaScript-based game built with Object-Oriented Programming principles.",
      ueber:
        "Steuere Sharkie, einen mutigen Hai in diesem Unterwasser-Jump'n Run-Abenteuer! Navigiere durch Meerestiefen, weiche Feinden aus und sammle Gegenstände in diesem JavaScript-basierten Spiel, das mit objektorientierter Programmierung entwickelt wurde.",
      technologies: 'HTML, CSS, JavaScript',
      learning: 'OOP',
      image: '../../assets/img/sharkie.png',
      github: 'https://github.com/MartinJaros90/sharkie',
      test: 'https://jan-bruchwalski.developerakademie.net/El%20Pollo%20Loco/index.html',
    },
    {
      number: 3,
      id: 3,
      name: 'Join',
      about:
        'Experience efficient task management with Join, a powerful Kanban-inspired application! Seamlessly organize your workflow using intuitive drag-and-drop functionality, collaborate with team members, and boost productivity through smart task categorization and user assignment features.',
      ueber:
        'Erlebe effizientes Aufgabenmanagement mit Join, einer leistungsstarken Kanban-inspirierten Anwendung! Organisiere deinen Arbeitsablauf mühelos durch intuitive Drag-and-Drop-Funktionen, arbeite mit Teammitgliedern zusammen und steigere die Produktivität durch intelligente Aufgabenkategorisierung und Benutzerzuweisungen.',
      technologies: 'HTML, CSS, JavaScript, Firebase',
      learning: 'a lot',
      image: '../../assets/img/join.png',
      github: 'https://github.com/MartinJaros90/join',
      test: 'https://join-327.developerakademie.net/login.html',
    },
  ];

  getTechIcon(tech: string): string | undefined {
    return this.techIconsMap[tech as TechType];
  }

  openDialog(project: string) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeDialog() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  getSelectedProjectData() {
    return this.contentForCard.find(
      (project) =>
        project.name.toLowerCase() === this.selectedProject?.toLowerCase()
    );
  }

  goToNextProject() {
    let currentProject = this.getSelectedProjectData();
    if (currentProject) {
      let currentIndex = this.contentForCard.indexOf(currentProject);
      let nextIndex = (currentIndex + 1) % this.contentForCard.length;
      this.selectedProject = this.contentForCard[nextIndex].name;
    }
  }
}
