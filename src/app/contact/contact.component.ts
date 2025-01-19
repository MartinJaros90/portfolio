import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  messageControl = new FormControl('', [Validators.required]);
  privacyControl = new FormControl(false, [Validators.requiredTrue]);

  isFormValid(): boolean {
    return (
      this.nameControl.valid &&
      this.emailControl.valid &&
      this.messageControl.valid &&
      this.privacyControl.valid
    );
  }
}
