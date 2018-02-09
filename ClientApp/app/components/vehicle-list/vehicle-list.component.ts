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
    page:1    
  };
  totalItems: number;

  
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.populateVehicles();    
    this.vehicleService.getMakes()
      .subscribe(res => {
        var makeToFilter: any[] = res;
        this.makes = makeToFilter.filter(x => x.models.length > 0);        
      });
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe( res => {
        this.vehicles = res.items;
        this.totalItems = res.totalItems;
        if(this.totalItems < this.PAGE_SIZE){
          this.query.pageSize = this.totalItems;
        }else {
          this.query.pageSize = this.PAGE_SIZE;
        }
      });
  }

  onFilterChange() {
    this.query.page = 1;
    this.query.pageSize = this.PAGE_SIZE;
    this.populateVehicles();
  }

  resetFilter(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
      isSortAscending: false      
    };
    this.populateVehicles();
  }

  sortBy(columnName: string){    
    if(this.query.sortBy != columnName )
        this.query.sortBy = columnName;     
     
    this.query.isSortAscending = !this.query.isSortAscending;
    this.populateVehicles();
  }

  onPageChanged(page:number){
    this.query.page = page;
    this.populateVehicles();
  }
}
