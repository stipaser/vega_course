import { Vehicle } from './../../models/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  vehicles: Vehicle[];
  makes: any[];
  query: any = {
    isSortAscending: false,
    pageSize: this.PAGE_SIZE,
    totalItems: 9
  };
  
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.initializeVehicles();    
    this.vehicleService.getMakes()
      .subscribe(res => {
        this.makes = res;
      });
  }

  private initializeVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe( res => {
        this.vehicles = res;       
      });
  }

  onFilterChange() {
    this.query.page = 1;
    this.initializeVehicles();
  }

  resetFilter(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
      isSortAscending: false,
      totalItems: 9
    };
    this.initializeVehicles();
  }

  sortBy(columnName: string){    
    if(this.query.sortBy != columnName )
        this.query.sortBy = columnName;     
     
    this.query.isSortAscending = !this.query.isSortAscending;
    this.initializeVehicles();
  }

  onPageChanged(page:number){
    this.query.page = page;
    this.initializeVehicles();
  }
}
