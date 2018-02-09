import { ModelService } from './services/model.service';
//  @angular
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// ng extensions
import { ToastyModule } from 'ng2-toasty';

// components
import { AppComponent } from './components/app/app.component';
import { AppErrorHandler } from './components/app/app.error-handler';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { MakeFormComponent } from './components/vehicles/make-form/make-form.component';
import { ModelFormComponent } from './components/vehicles/model-form/model-form.component';

// services
import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { ProgressService } from './services/progress.service';
import { BrowserXhrProgress } from './services/progress.service';
import { MakeService } from './services/make.service';
import { Auth } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'vehicles/new', component: VehicleFormComponent },
    { path: 'vehicles/edit/:id', component: VehicleFormComponent },
    { path: 'vehicles', component: VehicleListComponent },
    { path: 'vehicles/:id', component: ViewVehicleComponent },
    { path: 'vehicles/makes/add', component: MakeFormComponent }, 
    { path: 'vehicles/models/add', component: ModelFormComponent },    
   { path: 'profile', component: ProfileComponent },     
    { path: 'home', component: HomeComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: '**', redirectTo: 'home' }
];


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        MakeFormComponent,
        ModelFormComponent,
        ProfileComponent
    ],
    imports: [
        ToastyModule.forRoot(),
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(appRoutes, ) // { enableTracing: true }
    ], 
    providers: [
        Auth,
        VehicleService,
        PhotoService,
        ProgressService,
        MakeService,
        ModelService,
        { provide: BrowserXhr, useClass: BrowserXhrProgress }, 
        // { provide: ErrorHandler, useClass: AppErrorHandler }                
    ]
})
export class AppModuleShared {
}
