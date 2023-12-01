import { Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Medicine, TableMedicine } from "../entities/medicine";

interface Props {
    medicines: Medicine[],
    searchFor: string
}

const headers = ["Brand", "Company", "Dosage form", "Formulation", "Price", "Pack Size", "Reg No."];

const MedicinesTable = ({medicines,searchFor}:Props) => {
    return (
        <TableContainer fontSize={"sm"} marginY={8} style={{maxHeight:"calc(100vh - 80px)",minHeight:"auto"}} overflowY={"auto"}>
            <Heading marginY={3} fontSize={'xl'} as={"h2"}>{searchFor && 'Search result for: ' + searchFor}</Heading>
            <Table variant='striped' className="sticky-header">
                <Thead>
                    <Tr>
                        {headers.map((header) => <Th key={header}>{header}</Th>)}
                    </Tr>
                </Thead>
                <Tbody>
                    {medicines.map((medicine) => {
                        const rows = Object.keys(medicine)
                        return (
                            <Tr>
                                {rows.map((row) => <Td>{medicine[row as keyof TableMedicine]}</Td>)}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default MedicinesTable;