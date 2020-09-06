import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Page } from './models/pagination-model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-pagination',
  template: `

  <div *ngIf="!!page" class="d-flex align-items-center justify-content-center">

    <span (click)="customPageChanger(pageNumber)" *ngFor="let pageNumber of pageNumberList"
        [ngClass]="{'selectedPage': (pageNumber == selectedPage) }" class="mx-1 pageSpan">
        {{ pageNumber}}
    </span>

</div>

  `,
  styles: [`
    :host {

      .d-flex {
        display: flex;
      }

      .align-items-center {
        align-items: center;
      }

      .justify-content-center {
        justify-content: center;
      }

      .mr-2 {
        margin-right: 1rem;
      }

      .ml-2 {
        margin-right: 1rem;
      }

      .mx-1 {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }

      .cursor-pointer {
        cursor: pointer;
      }

      .pageSpan {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3rem;
          height: 2.5rem;
          cursor: pointer;
          border-radius: 0.35714286rem;
      }

      .selectedPage {
          background-color: #626bb;
          color: white;
      }

      .pager-cursor {
          cursor: pointer !important;

          &.disabled {
              cursor: auto !important;
          }
      }
    }
  `]
})
export class NgPaginationComponent implements OnChanges {

  @Input() page: Page;

  // Setting the pageNumbers to be shown
  pageNumberList = [];

  // Holds currenlty selected page to hightlight that page
  @Input() selectedPage = 1;

  // Since, we are having slot of pages starting index & ending index;
  // Can pass the ending index i.e. till that page more pages icons won't be shown
  // no of end page will be rendered directly
  startPage = 1;
  @Input() endPage = 4;

  // Flag for showing previous& next page slot
  showPreviousSlot = false;
  showNextSlot = false;

  @Output() pageChangeEvent = new EventEmitter<any>();

  ngOnChanges(change: SimpleChanges) {
    if (!!this.page) {
      this.setPageList();
    }
  }

  setPageList() {
    this.pageNumberList = [];
    // Since, we have fixed the number of pages to be shown first to as 4
    if (this.page.last_page <= this.endPage) {
      let start = this.startPage;
      while (start <= this.page.last_page) {
        this.pageNumberList.push(start);
        start++;
      }
    } else {
      let start = this.startPage;
      while (start <= this.endPage) {
        this.pageNumberList.push(start);
        start++;
      }
      if (this.endPage < this.page.last_page) {
        this.showNextSlot = true;
      }
    }
    this.selectedPage = this.page.current_page;
  }

  // Method on clicking on page
  customPageChanger(pageNum) {
    if (pageNum <= this.page.last_page) {
      this.selectedPage = pageNum;
      this.page.current_page = pageNum;
      this.loadNewPage();
    }
  }

  // Moves one page backward
  prevPage() {
    if (!!this.page) {
      if (this.page.current_page > 1) {
        this.page.current_page--;
        this.selectedPage = this.page.current_page;
        if (this.page.current_page < this.startPage) {
          this.startPage = this.startPage - 1;
          this.endPage = this.endPage - 1;
        }
        if (this.startPage <= 1) {
          this.startPage = 1;
          this.showPreviousSlot = false;
        }
        this.loadNewPage();
      }
    }
  }

  // Moves one page forward
  nextPage() {
    if (!!this.page) {
      if (this.page.current_page < this.page.last_page) {
        this.page.current_page++;
        this.selectedPage = this.page.current_page;
        if (this.page.current_page > this.endPage) {
          this.startPage = this.startPage + 1;
          this.endPage = this.endPage + 1;
          if (this.endPage >= this.page.last_page) {
            this.endPage = this.page.last_page;
            this.showNextSlot = false;
          }
          this.showPreviousSlot = true;
        }
        this.loadNewPage();
      }
    }
  }

  // Event Emitter
  loadNewPage() {
    this.pageChangeEvent.emit(this.page);
  }

}
