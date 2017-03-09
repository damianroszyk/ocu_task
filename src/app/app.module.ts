import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';
import {RouterModule} from '@angular/router';
import {routes} from './app.routing';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './services/auth.guard';
import {HomeService} from './services/home.service';
import { TopComponent } from './top/top.component';
import {LoginGuard} from './services/login.guard';
import { BatchComponent } from './batch/batch.component';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
import { BatchInfoComponent } from './batch-info/batch-info.component';
import { BatchCirclesComponent } from './batch-circles/batch-circles.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopComponent,
    BatchComponent,
    BatchDetailComponent,
    BatchInfoComponent,
    BatchCirclesComponent,
    CardComponent
  ],
  imports: [
    Ng2GoogleChartsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuard, LoginGuard, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
