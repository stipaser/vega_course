import { Feature } from './../models/feature.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FeatureService {
    constructor(private http: Http){}

    getFeatures(){
        return this.http.get('/api/vehicles/features')
        .map(res => res.json());
    }

    getFeature(id: number){
        return this.http.get('/api/vehicles/features/' + id)
            .map(res => res.json());
    }

    updateFeature(feature: Feature){
        return this.http.put('/api/vehicles/features/' + feature.id, feature)
            .map(res => res.json());
    }
}