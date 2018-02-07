//  @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

// components
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

// services
import { VehicleService } from './services/vehicle.service';

// Error
// import { AppErrorHandler } from './components/app/app.error-handler';
// import { ErrorHandler } from '@angular/core';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'vehicles/new', component: VehicleFormComponent },
    { path: 'vehicles/edit/:id', component: VehicleFormComponent },
    { path: 'vehicles', component: VehicleListComponent },
    { path: 'vehicles/:id', component: ViewVehicleComponent },    
    { path: 'home', component: HomeComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: '**', redirectTo: 'home' }
];


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent
    ],
    imports: [
        ToastyModule.forRoot(),
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ], 
    providers: [
        VehicleService,
        //{ provide: ErrorHandler, useClass: AppErrorHandler }                
    ]
})
export class AppModuleShared {
}
