import { Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMedinceStore } from "../store";
import { TableMedicine } from "../entities/medincine";


const headers = ["Brand", "Company", "Dosage form", "Formulation", "Price", "Pack Size", "Reg No."];

const MedicinesTable = () => {
    const {searchFor,medicines} = useMedinceStore((store) =>  store);
    return (
        <TableContainer fontSize={"sm"} style={{height:"calc(100vh - 80px)"}} overflowY={"auto"}>
            <Heading marginY={3} fontSize={'xl'} as={"h2"}>{searchFor && 'Search result for: ' + searchFor}</Heading>
            <Table variant='striped'>
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