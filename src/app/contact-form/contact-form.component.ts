import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      const formData: ContactFormData = this.contactForm.value;

      this.http.post<{ message: string }>('https://formspree.io/f/xrbpzjqb', formData).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.contactForm.reset();
          setTimeout(() => (this.successMessage = ''), 5000);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Failed to send message. Please try again.';
          setTimeout(() => (this.errorMessage = ''), 5000);
        }
      }).add(() => {
        this.isSubmitting = false;
      });
    }
  }
}
