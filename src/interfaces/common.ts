export interface PaginationData {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasMore: boolean;
}

export interface UserData {
  address: string | null;
  details: string | null;
  id: number;
  is_public: boolean;
  name: string;
  type: "public" | "pharmacist";
  username: string;
}

export interface QueryType {
  searchBy: string;
  value: string;
  dosageForm: string;
}
