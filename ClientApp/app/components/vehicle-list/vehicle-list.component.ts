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
  vehiclesAll: Vehicle[];
  makes: any[];
  filters: any = {};


  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.initializeVehicles();    
    this.vehicleService.getMakes()
      .subscribe(res => {
        this.makes = res;
      });
  }

  private initializeVehicles(){
    this.vehicleService.getVehicles()
      .subscribe( res => {
        this.vehiclesAll = res;
        this.vehicles = res;       
      });
  }

  onFilterChange() {
    this.vehicles = this.vehiclesAll;
    if(this.filters.makeId)
      this.vehicles = this.vehiclesAll.filter(v => v.make.id == this.filters.makeId);
  }

  resetFilter(){
    this.filters = {};
    this.onFilterChange();
  }

}
