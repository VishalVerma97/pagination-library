import { Component } from '@angular/core';
import { Page } from 'ng-pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pagination-library';

  page: Page = {
    current_page: 1,
    from: 1,
    to: 6,
    last_page: 6,
    per_page: 10,
    total: 60
  };
}
