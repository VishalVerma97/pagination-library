import { NgModule } from '@angular/core';
import { NgPaginationComponent } from './ng-pagination.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NgPaginationComponent],
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [NgPaginationComponent]
})
export class NgPaginationModule { }
