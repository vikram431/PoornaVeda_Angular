import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-auth',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin = true;
  loading = false;
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private registerService: RegisterService) {
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
      ]
    });
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
        console.log(this.authForm.value.email);
        this.authService.authenticateUser(email, password).subscribe({
          next: (res) => {
            console.log(res);
            localStorage.setItem("token", res.token);
            localStorage.setItem("emailId", email);
            this.authService.setLoginStatus(true);
            console.log(localStorage);
            this.router.navigate(['/']);
          },
          error: (err) => {
            if (err.status === 404) {
              console.log("User not found");
            } if (err.status === 401) {
              alert("Invalid Password");
            } else {
              console.log("Some other error occurred");
            }

          }
        });
      }
      else {
        const requestbody = {
            name: fullName,
            password: password,
            emailId:email
          };

        this.registerService.registerUser(requestbody).subscribe({
          next: (res)=>{
            console.log(res);
             if(res.responseCode === '302 FOUND'){
              alert("User Already Exists")
            }
            else{
               localStorage.setItem("token", res.token);
               
               alert("Signup successful (dummy)");
               this.router.navigate(['/']);
            }
          },
          error:(err)=>{
            if(err.status === 302){
              alert("User Already Exists")
            }
            else{
              console.log("some error ocuured")
            }

          }
          
        });

        console.log("Signup:", { fullName, email, password });
       
        
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      this.loading = false;
    }
  }
}
