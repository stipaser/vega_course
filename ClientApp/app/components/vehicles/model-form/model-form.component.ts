import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { MakeService } from './../../../services/make.service';
import { Model } from './../../../models/model.model';
import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../../services/model.service';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.css']
})
export class ModelFormComponent implements OnInit {
  makes: any[];
  model:Model = {
    id: 0,
    name: '',
    makeId: 0
  }

  constructor(
    private makeService: MakeService,
    private modelService: ModelService,
    private router: Router,
    private toastyService: ToastyService
   ) {}

  ngOnInit() {
    this.makeService.getMakes()
      .subscribe(res => {
        this.makes = res;       
      });
  }

  submitForm(){
    if(this.model.makeId != 0){
      this.modelService.create(this.model)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/vehicles']);
        });
    }
    else{
      this.toastyService.error({
        title: 'Error',
        msg: 'Please select Make.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 3000
      });
    }
  }
}
