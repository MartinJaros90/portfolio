import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-showcase',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-showcase.component.html',
  styleUrl: './portfolio-showcase.component.scss',
})
export class PortfolioShowcaseComponent {
  selectedProject: string | null = null;

  openDialog(project: string) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeDialog() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}
