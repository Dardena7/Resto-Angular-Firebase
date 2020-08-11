import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getUser()) {
      this.router.navigate(['/admin']);
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }   
    this.authService.login(form.value.email, form.value.password).subscribe(
      response => {
        this.router.navigate(['/admin']);
      },
      error => {
        this.error = error;
      }
    );
  }
}
