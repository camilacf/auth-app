import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { auth$, authenticate, unauthenticate } from "@spms/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'auth-app';
  loggedIn: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){
    auth$.subscribe((s:any) => {
      this.loggedIn = s.authenticated;
      if(this.loggedIn){
        this.form.get('username')?.setValue(s.username)
      }
      else{
        this.form.get('username')?.setValue('')
      }
      console.log("entrou aqui")
    })
  }

  gotoSclinico(){
    this.router.navigate(['/sclinico']);
  }

  login(){
    if(this.form.valid){
      authenticate(this.form.get('username')?.value);
    }
  }

  logout(){
    unauthenticate();
  }
}
