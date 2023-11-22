
export interface TableMedicine {
    reg_no: string | null;
    brand_name: string | null;
    company_name: string | null;
    formulation: string | null;
    dosage_form: string | null;
    pack_size: string | null;
    mrp: number | null;
}

export interface Medicine {
    id: number;
    reg_no: string | null;
    brand_name: string | null;
    company_name: string | null;
    formulation: string | null;
    dosage_form: string | null;
    pack_size: string | null;
    mrp: number | null;
    remarks: string | null;
    efficacy: string | null;
    is_public: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
}