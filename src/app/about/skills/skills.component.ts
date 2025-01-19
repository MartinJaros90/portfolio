import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skills = [
    { icon: 'html.png', name: 'HTML' },
    { icon: 'css.png', name: 'CSS' },
    { icon: 'javascript.png', name: 'JavaScript' },
    { icon: 'typescript.png', name: 'TypeScript' },
    { icon: 'angular.png', name: 'Angular' },
    { icon: 'firebase.png', name: 'Firebase' },
    { icon: 'api.png', name: 'REST API' },
    { icon: 'scrum.png', name: 'SCRUM' },
    { icon: 'git.png', name: 'GIT' },
  ];
}
