import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollAnimationDirective } from '../shared/directives/scroll-animation.directive';
import { ContactService } from '../shared/services/contact.service';

interface ContactForm {
  name: string;
  email: string;
  message: string;
  privacy: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ScrollAnimationDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  showSuccessMessage = false;

  constructor(private contactService: ContactService, private router: Router) {}

  isFormValid(): boolean {
    return this.contactForm.valid;
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData = {
        name: this.contactForm.get('name')?.value || '',
        email: this.contactForm.get('email')?.value || '',
        message: this.contactForm.get('message')?.value || '',
        privacy: this.contactForm.get('privacy')?.value || false,
      };

      try {
        const response = await this.contactService
          .sendMessage(formData)
          .toPromise();
        this.submitSuccess = true;
        this.showSuccessMessage = true;
        this.contactForm.reset();

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      } catch (error) {
        console.error('Fehler beim Senden:', error);
        this.submitError = true;
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  navigateToPrivacyPolicy() {
    // Speichere die aktuelle Scroll-Position
    const scrollPosition = window.pageYOffset;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    this.router.navigate(['/privacy-policy']);
  }
}
