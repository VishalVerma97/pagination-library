import { NgModule } from '@angular/core';
import { NgPaginationComponent } from './ng-pagination.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgPaginationComponent],
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports: [NgPaginationComponent]
})
export class NgPaginationModule { }
