import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MakeService {
    constructor(private http: Http){}

    create(make: any){
        return this.http.post('/api/vehicles/makes', make)
            .map(res => res.json());
    }

    getMakes(){
        return this.http.get('/api/vehicles/makes')
            .map(res => res.json())
      }
}