import { Model } from './../models/model.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ModelService {
    constructor(private http: Http){
    }

    create(model:Model){
        return this.http.post('/api/vehicles/models', model)
            .map(res => res.json());
    }
}
