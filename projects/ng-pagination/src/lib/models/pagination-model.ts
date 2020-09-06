export interface Page {

    // The current page number
    current_page: number;

    // start
    from: number;

    // end
    to: number;

    // the last page number
    last_page: number;

    // rows per page
    per_page: number;

    // The total number of elements
    total: number;
}
