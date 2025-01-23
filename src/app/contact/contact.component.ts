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
  private emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(this.emailPattern),
    ]),
    message: new FormControl('', [Validators.required]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  showSuccessMessage = false;
  showOverlayMessage = false;

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

        this.showOverlayMessage = true;
        setTimeout(() => {
          this.showOverlayMessage = false;
        }, 2000);

        this.contactForm.reset();
      } catch (error) {
        console.error('Fehler beim Senden:', error);
        this.submitError = true;
        this.showOverlayMessage = true;
        setTimeout(() => {
          this.showOverlayMessage = false;
        }, 2000);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  navigateToPrivacyPolicy() {
    const scrollPosition = window.pageYOffset;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    this.router.navigate(['/privacy-policy']);
  }
}
