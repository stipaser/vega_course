import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { SaveVehicle, Vehicle } from '../../models/vehicle.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import * as _ from 'underscore';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];

  vehicle: SaveVehicle = { 
    id: 0,
    modelId: 0,
    makeId: 0,
    isRegistered: false,
    contact: { name:'', phone: '', email: ''},
    features: []
  };



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {

      route.params.subscribe (p => {
        this.vehicle.id = +p['id'] || 0;
      });
    }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if(this.vehicle.id){
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    Observable.forkJoin(sources)
      .subscribe(data =>{
        var makesToFilter = data[0] as any[];
        this.makes = makesToFilter.filter(x => x.models.length > 0);
        this.features = data[1] as any[];
        if(this.vehicle.id)
          this.setVehicle(data[2] as Vehicle);
          this.populateModel();
      }, err => {
            if(err.status == 404)
                this.router.navigate(['/home']);
        });   
   
  }

  private setVehicle(veh: Vehicle){
    this.vehicle.id = veh.id;
    this.vehicle.makeId = veh.make.id;
    this.vehicle.modelId = veh.model.id;
    this.vehicle.isRegistered = veh.isRegistered;
    this.vehicle.contact = veh.contact;
    this.vehicle.features = _.pluck(veh.vehicleFeatures, 'id');
  }

  onMakeChange(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  populateModel(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }
  

  OnFeatureToggle(featureId:number, $event:any){
    if($event.target.checked){
      this.vehicle.features.push(featureId);
    }
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit(){
    if(this.vehicle.id){
      this.vehicleService.updateVehicle(this.vehicle)
        .subscribe(res => {
            this.toastyService.success({
              title: 'Succes',
              msg: 'The vehicle was successfully updated.',
              theme: 'bootstrap',
              showClose: true,
              timeout: 5000
            });
            this.router.navigate(['/vehicles/', this.vehicle.id]);
        });
    } else {
      this.vehicleService.createVehicle(this.vehicle)
        .subscribe(res => {
          this.toastyService.success({
            title: 'Succes',
            msg: 'The vehicle was successfully created.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/vehicles/', res.id]);
        });
    }
  }

  onDelete(){    
    this.vehicleService.deleteVehicle(this.vehicle.id)
      .subscribe(res => {
        this.toastyService.info({
          title: 'Success',
          msg: 'The vehicle was successfully deleted.',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
        this.router.navigate(['/vehicles']);
    });
  }

}
