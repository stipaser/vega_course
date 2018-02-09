import { ProgressService } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  @ViewChild('fileInput') fileInput: ElementRef;
  photos: any[];
  progress = {percentage: 0};
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService,
    private photoService: PhotoService, 
    private progressService: ProgressService,
    private ngZone: NgZone) {
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

      this.photoService.getPhotos(this.vehicleId)
        .subscribe(res => {
            this.photos = res;
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

  uploadPhoto(){
    
    this.progressService.startTracking()
    .subscribe(progress => {
      console.log(progress);
      this.ngZone.run(() => {
        this.progress.percentage = progress.percentage;
      });
    },
    () => {},
    () => {
      console.log("COMPLETE UPLOAD");
      this.progress.percentage = 0;
    });
    
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files ? nativeElement.files[0] : null;
    nativeElement.value = '';
    if(file)
      this.photoService.upload(this.vehicleId, file)
        .subscribe(res => {
          this.photos.push(res);                  
        },
        err => {          
            this.toastyService.error({
                title: 'Error',
                msg: err.text(),
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });
  }

}
