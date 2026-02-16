import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  standalone:true,
  selector: 'app-profile',
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any = {};
  newPassword: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    // this.fetchUserDetails();
  }

  fetchUserDetails() {
  //   this.authService.getUserDetails().subscribe(res => {
  //     this.user = res;
  //   });
  alert("Profile Updated Successfully");
  }

  updateProfile() {
  //   this.authService.updateUser(this.user).subscribe(res => {
      alert("Profile Updated Successfully");
  //   });
  }

  changePassword() {
  //   this.authService.changePassword(this.newPassword).subscribe(res => {
      alert("Password Changed Successfully");
  //   });
  }

  logout() {
    this.authService.logout();
    this.navigate('auth');
  }

    navigate(path: string): void {
    console.log(path);
    this.router.navigate([path]);
  }
}
