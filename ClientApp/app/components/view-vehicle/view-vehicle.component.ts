import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {
        route.params.subscribe (p => {
          this.vehicleId = p['id'];
          if(isNaN(this.vehicleId) || this.vehicleId <= 0){
            router.navigate(['/vehicles']);
          }
        });
     }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(res => {
          this.vehicle = res;
      }, err => {
        if(err.status == 404){
          this.router.navigate(['/vehicles']);
          return;
        }
      });
  }

  onDelete(){
    if(confirm('Are you sure?')){
      this.vehicleService.deleteVehicle(this.vehicleId)
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

}
