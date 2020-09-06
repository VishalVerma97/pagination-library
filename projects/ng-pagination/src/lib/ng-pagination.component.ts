import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Page } from './models/pagination-model';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-pagination',
  template: `

  <div *ngIf="!!page" class="d-flex align-items-center justify-content-center">

    <span (click)="prevPage()" class="d-flex align-items-center mr-2">
      <fa-icon class="pager-cursor" [class.disabled]="page?.current_page == 1" [icon]="faLeft"></fa-icon>
    </span>

    <fa-icon *ngIf="showPreviousSlot" class="mx-1 cursor-pointer ellipsis" [icon]="faEllipsis"></fa-icon>

    <span (click)="customPageChanger(pageNumber)" *ngFor="let pageNumber of pageNumberList"
        [ngClass]="{'selectedPage': (pageNumber == selectedPage) }" class="mx-1 pageSpan">
        {{ pageNumber}}
    </span>

    <fa-icon *ngIf="showNextSlot" class="mx-1 cursor-pointer ellipsis" [icon]="faEllipsis"></fa-icon>

    <span (click)="nextPage()" class="d-flex align-items-center ml-2">
      <fa-icon class="pager-cursor" [class.disabled]="page?.current_page == page?.last_page" [icon]="faRight">
      </fa-icon>
    </span>

</div>

  `,
  styleUrls: ['./ng-pagination.component.scss']
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
  faLeft = faChevronLeft;
  faRight = faChevronRight;
  faEllipsis = faEllipsisH;

  ngOnChanges(change: SimpleChanges) {
    if (!!this.page) {
      this.selectedPage = this.page.current_page;
      this.setPageList();
    }
  }

  setPageList() {
    this.pageNumberList = [];
    // Since, we have fixed the number of pages to be shown first upto the endPage
    if (this.page.last_page <= this.endPage) {
      let start = this.startPage;
      while (start <= this.page.last_page) {
        this.pageNumberList.push(start);
        start++;
      }
      this.showNextSlot = false;
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
          if (this.startPage <= 1) {
            this.startPage = 1;
            this.showPreviousSlot = false;
          }
          // shifting valus
          for (let i = this.pageNumberList.length - 1; i > 0; i--) {
            this.pageNumberList[i] = this.pageNumberList[i - 1];
          }
          this.pageNumberList[0] = this.startPage;
        }
        if (this.page.last_page > this.endPage) {
          this.showNextSlot = true;
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
          // Updating the page number list
          this.pageNumberList.splice(0, 1);
          this.pageNumberList.push(this.endPage);
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
