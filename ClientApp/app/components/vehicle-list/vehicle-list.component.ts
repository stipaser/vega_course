import { Vehicle } from './../../models/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  makes: any[];
  filter: any = {};


  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.initializeVehicles();    
    this.vehicleService.getMakes()
      .subscribe(res => {
        this.makes = res;
      });
  }

  private initializeVehicles(){
    this.vehicleService.getVehicles(this.filter)
      .subscribe( res => {
        this.vehicles = res;       
      });
  }

  onFilterChange() {
    this.initializeVehicles();
  }

  resetFilter(){
    this.filter = {};
    this.onFilterChange();
  }

}
