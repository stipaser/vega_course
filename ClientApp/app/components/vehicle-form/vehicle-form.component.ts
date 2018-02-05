import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { SaveVehicle, Vehicle } from '../../models/vehicle.model';


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
        this.vehicle.id = p['id'];
      });
     }

  ngOnInit() {
    
      
    this.vehicleService.getVehicle(+this.vehicle.id)
      .subscribe(res => {
          this.populateVehicle(res);          
      },
      err => {
        //if(err.status == 404)
          // this.router.navigate(['/home'])
      });

    this.vehicleService.getMakes()
      .subscribe(makes => {
        this.makes = makes;
      });

      this.vehicleService.getFeatures()
        .subscribe(features => {
          this.features = features;
        })
  }

  onMakeChange(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  populateModel(makeId:number){
    var selectedMake = this.makes.find(m => m.id == makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }

  populateVehicle(veh: Vehicle){
    this.vehicle.contact = veh.contact;
    this.vehicle.id = veh.id;
    this.vehicle.isRegistered = veh.isRegistered;
    this.vehicle.makeId = veh.make.id;
    this.models = (this.makes.find(m => m.id == veh.make.id)).models;
    this.vehicle.modelId = veh.model.id;
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
    this.vehicleService.createVehicle(this.vehicle)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/home']);
      });
  }

}
