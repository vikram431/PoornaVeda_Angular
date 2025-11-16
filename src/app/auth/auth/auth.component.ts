import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth',
  imports:[CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin = true;
  loading = false;
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = this.fb.group({
      fullName: [''],
      email: ['', [Validators.required, Validators.email]],
password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        ]
      ]    });
  }

toggleAuthMode(): void {
  this.isLogin = !this.isLogin;

  if (!this.isLogin) {
    this.authForm.get('fullName')?.setValidators([Validators.required]);
  } else {
    this.authForm.get('fullName')?.clearValidators();
  }

  this.authForm.get('fullName')?.updateValueAndValidity();
}


async onSubmit(): Promise<void> {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched(); // highlight errors
      return;
    }

    this.loading = true;

    const { fullName, email, password } = this.authForm.value;

    try {
      if (this.isLogin) {
        console.log("Login:", { email, password });
        alert("Login successful (dummy)");
      } else {
        console.log("Signup:", { fullName, email, password });
        alert("Signup successful (dummy)");
      }

      this.router.navigate(['/']);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      this.loading = false;
    }
  }
}
