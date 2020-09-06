import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgPaginationModule } from 'ng-pagination';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
