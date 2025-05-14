export type Pagination = {
    currentPage: number,
    perPage: number,
    total: number,
    lastPage: number,
    firstPage: number,
    nextPage: number | null,
    previousPage: number | null,
}