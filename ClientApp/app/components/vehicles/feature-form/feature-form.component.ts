import { Subject } from 'rxjs/Subject';
import { FeatureService } from './../../../services/feature.service';
import { Feature } from './../../../models/feature.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})
export class FeatureFormComponent implements OnInit {

  feature: Feature = { id: 0, name: ''};

  constructor(private featureService: FeatureService,
    private route: ActivatedRoute,
    private router: Router,) { 
      route.params.subscribe (p => {
        this.feature.id = +p['id'] || 0;
      });
  }

  ngOnInit() {
    this.featureService.getFeature(this.feature.id)
      .subscribe(res => {
          this.feature = res;
      });
  }

  submit(){
    if(this.feature.id != 0){
      this.featureService.updateFeature(this.feature)
        .subscribe(res => {
            this.router.navigate(['features/']);
        });
    }
  }

}
