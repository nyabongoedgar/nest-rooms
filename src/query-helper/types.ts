export interface Filter {
  field: string;
  value: any;
  operator: string;
}

export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface Pagination {
  page: number;
  limit: number;
}
