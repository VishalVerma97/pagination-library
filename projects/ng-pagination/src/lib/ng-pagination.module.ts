import { NgModule } from '@angular/core';
import { NgPaginationComponent } from './ng-pagination.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgPaginationComponent],
  imports: [
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  exports: [NgPaginationComponent]
})
export class NgPaginationModule { }
