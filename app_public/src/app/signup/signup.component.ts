import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Event, ShoppingList, User } from '../bakingbella';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  form: FormGroup;
  public passwordinvalid = false;  
  newevent : Event = {
    _id: '',
    name: '',
    type: '',
    datetime: new Date()
  }
  newshoppinglist : ShoppingList = {
    _id: '',
    quantity : 0,
    totalprice: 0,
    product_id: ''
  }
  newus : User= {
    _id : '',
    firstName : '',
    lastName : '',
    DOB : new Date(),
    username : '',
    password : '',
    type : "user",
    events : [this.newevent],
    shoppinglists : [this.newshoppinglist]
  }

  
  constructor(private fb: FormBuilder,private router: Router,private bakingBellaService : BakingBellaDataService) {
    this.form = this.fb.group({
      firstname : ['', Validators.required],
      lastname : [''],
      dob: ['', Validators.required],
      username: ['', Validators.email],
      password: ['', Validators.required],
      passwordconfirm: ['', Validators.required]
    });

    //DOB validation times
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date();
  }

  async ngOnInit(): Promise<void>{    
  }

  async onSubmit(): Promise<void> {
    this.passwordinvalid = false;
    if (this.form.valid) {
      const password = this.form.get('password')?.value;
      const passwordconf = this.form.get('passwordconfirm')?.value;
      if(password!==passwordconf){
        this.passwordinvalid = true;
      }else{
        const firstname = this.form.get('firstname')?.value;
        const lastname = this.form.get('lastname')?.value;
        const dob = this.form.get('dob')?.value;
        const username = this.form.get('username')?.value;
        
        //Create user structure
        this.newus.firstName = firstname;
        this.newus.lastName = lastname;
        this.newus.DOB = dob;
        this.newus.username = username;
        this.newus.password = password;
        this.newus.type = "user";        
        
        //Call the service
        await this.bakingBellaService.createUser(this.newus);
        
        
        console.log("OK, user created!!!");
      }
    }
  }
}