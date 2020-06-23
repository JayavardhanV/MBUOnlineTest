import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostviewComponent } from './components/postview/postview.component';
import { ResourceComponent } from './components/resource/resource.component';
import { LoginComponent } from './components/login/login.component';

import { ResourceService } from './services/resource/resource.service'
import { PostviewService } from './services/postview/postview.service';
import { LoginService } from './services/login/login.service';
import { AuthenticationService } from './services/Authenticate/authenticate.service';

import { NotificationService } from './services/notification/notification.service';

import { RemovewhitespacesPipe } from './pipes/trim/removewhitespaces.pipe';
import { NotificationComponent } from './components/notification/notification/notification.component'

@NgModule({
  declarations: [
    AppComponent,
    PostviewComponent,
    ResourceComponent,
    LoginComponent,
    RemovewhitespacesPipe,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostviewService, ResourceService, LoginService, NotificationService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
