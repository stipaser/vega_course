import { FeatureService } from './../../../services/feature.service';
import { Feature } from './../../../models/feature.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements OnInit {

  features: Feature[] = [];

  constructor(private featureService: FeatureService) { }

  ngOnInit() {
    this.featureService.getFeatures()
      .subscribe(res => {
          this.features = res;
      });
  }

  onClickName(){
    
  }

}
