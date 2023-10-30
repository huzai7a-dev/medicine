import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface Medicine {
    brand_name: string;
    company_name: string;
    dosage_form: string;
    formulation: string;
    mrp: number;
    pack_size: string;
    reg_no: string;
}

const medicines:Medicine[] = [
    {
        brand_name: "Medicine1",
        company_name: "Company1",
        dosage_form: "Tablet",
        formulation: "Formula1",
        mrp: 10.99,
        pack_size: "10 tablets",
        reg_no: "12345678"
    },
    {
        brand_name: "Medicine2",
        company_name: "Company2",
        dosage_form: "Capsule",
        formulation: "Formula2",
        mrp: 15.99,
        pack_size: "30 capsules",
        reg_no: "23456789"
    },
    {
        brand_name: "Medicine3",
        company_name: "Company3",
        dosage_form: "Suspension",
        formulation: "Formula3",
        mrp: 8.49,
        pack_size: "100 ml",
        reg_no: "34567890"
    },
    {
        brand_name: "Medicine4",
        company_name: "Company4",
        dosage_form: "Tablet",
        formulation: "Formula4",
        mrp: 12.99,
        pack_size: "20 tablets",
        reg_no: "45678901"
    },
    {
        brand_name: "Medicine5",
        company_name: "Company5",
        dosage_form: "Capsule",
        formulation: "Formula5",
        mrp: 9.99,
        pack_size: "60 capsules",
        reg_no: "56789012"
    },
    {
        brand_name: "Medicine6",
        company_name: "Company6",
        dosage_form: "Tablet",
        formulation: "Formula6",
        mrp: 7.99,
        pack_size: "50 tablets",
        reg_no: "67890123"
    },
    {
        brand_name: "Medicine7",
        company_name: "Company7",
        dosage_form: "Suspension",
        formulation: "Formula7",
        mrp: 11.49,
        pack_size: "200 ml",
        reg_no: "78901234"
    },
    {
        brand_name: "Medicine8",
        company_name: "Company8",
        dosage_form: "Capsule",
        formulation: "Formula8",
        mrp: 6.99,
        pack_size: "40 capsules",
        reg_no: "89012345"
    },
    {
        brand_name: "Medicine9",
        company_name: "Company9",
        dosage_form: "Tablet",
        formulation: "Formula9",
        mrp: 14.99,
        pack_size: "25 tablets",
        reg_no: "90123456"
    },
    {
        brand_name: "Medicine10",
        company_name: "Company10",
        dosage_form: "Suspension",
        formulation: "Formula10",
        mrp: 13.99,
        pack_size: "150 ml",
        reg_no: "01234567"
    },
    {
        brand_name: "Medicine1",
        company_name: "Company1",
        dosage_form: "Tablet",
        formulation: "Formula1",
        mrp: 10.99,
        pack_size: "10 tablets",
        reg_no: "12345678"
    },
    {
        brand_name: "Medicine2",
        company_name: "Company2",
        dosage_form: "Capsule",
        formulation: "Formula2",
        mrp: 15.99,
        pack_size: "30 capsules",
        reg_no: "23456789"
    },
    {
        brand_name: "Medicine3",
        company_name: "Company3",
        dosage_form: "Suspension",
        formulation: "Formula3",
        mrp: 8.49,
        pack_size: "100 ml",
        reg_no: "34567890"
    },
    {
        brand_name: "Medicine4",
        company_name: "Company4",
        dosage_form: "Tablet",
        formulation: "Formula4",
        mrp: 12.99,
        pack_size: "20 tablets",
        reg_no: "45678901"
    },
    {
        brand_name: "Medicine5",
        company_name: "Company5",
        dosage_form: "Capsule",
        formulation: "Formula5",
        mrp: 9.99,
        pack_size: "60 capsules",
        reg_no: "56789012"
    },
    {
        brand_name: "Medicine6",
        company_name: "Company6",
        dosage_form: "Tablet",
        formulation: "Formula6",
        mrp: 7.99,
        pack_size: "50 tablets",
        reg_no: "67890123"
    },
    {
        brand_name: "Medicine7",
        company_name: "Company7",
        dosage_form: "Suspension",
        formulation: "Formula7",
        mrp: 11.49,
        pack_size: "200 ml",
        reg_no: "78901234"
    },
    {
        brand_name: "Medicine8",
        company_name: "Company8",
        dosage_form: "Capsule",
        formulation: "Formula8",
        mrp: 6.99,
        pack_size: "40 capsules",
        reg_no: "89012345"
    },
    {
        brand_name: "Medicine9",
        company_name: "Company9",
        dosage_form: "Tablet",
        formulation: "Formula9",
        mrp: 14.99,
        pack_size: "25 tablets",
        reg_no: "90123456"
    },
    {
        brand_name: "Medicine10",
        company_name: "Company10",
        dosage_form: "Suspension",
        formulation: "Formula10",
        mrp: 13.99,
        pack_size: "150 ml",
        reg_no: "01234567"
    }
];
const headers = ["Brand", "Company", "Dosage form", "Formulation", "Price", "Pack Size", "Reg No."];

const MedicinesTable = () => {
    return (
        <TableContainer style={{height:"calc(100vh - 80px)"}} overflowY={"auto"}>
            <Table variant='striped'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        {headers.map((header) => <Th>{header}</Th>)}
                    </Tr>
                </Thead>
                <Tbody>
                    {medicines.map((medicine) => {
                        const rows = Object.keys(medicine)
                        return (
                            <Tr>
                                {rows.map((row)=> <Td>{medicine[row as keyof Medicine]}</Td>)}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default MedicinesTable;