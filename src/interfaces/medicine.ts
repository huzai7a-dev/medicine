import { PaginationData } from "./common";

export interface Medicine {
  id: number;
  brand_name?: string | null;
  company_name?: string | null;
  created_at?: Date | null;
  dosage_form?: string | null;
  formula?: string | null;
  formulation?: string | null;
  efficacy?: string | null;
  is_public: boolean;
  milligrams?: string | null;
  mrp?: number | null;
  pack_size?: string | null;
  reg_no?: string | null;
  remarks?: string | null;
  updated_at?: Date | null;
  updated_by?: string | null;
}
export interface PaginatedMedicines {
  data: Medicine[];
  pagination: PaginationData;
}
