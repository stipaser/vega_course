import { Auth } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public auth: Auth) {
        auth.handleAuthentication();
    }
}
