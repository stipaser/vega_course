import { Router } from '@angular/router';
import { Make } from './../../../models/make.model';
import { MakeService } from './../../../services/make.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.css']
})
export class MakeFormComponent implements OnInit {

  make: Make = 
  { 
    name: '',
    id: 0
  };
   
  constructor(private makeService: MakeService, private router: Router) { }

  ngOnInit() {}

  submitForm(){
    
    this.makeService.create(this.make)
      .subscribe(res => {
          console.log(res);
          this.router.navigate(['/vehicles']);
      })
  }

}
