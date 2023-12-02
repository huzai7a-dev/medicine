import {
  Box,
  Heading,
//   Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Medicine } from "../entities/medicine";

interface Props {
  medicines: Medicine[];
  searchFor: string;
}

const headers = [
  "Brand",
  "Company",
  "Dosage form",
  "Formulation",
  "Price",
  "Pack Size",
  "Reg No.",
];

const MedicinesTable = ({ medicines, searchFor }: Props) => {
    // const [list,setList] = useState(medicines);

    // const onSort = ()=> {
    //     const sortedList = list.sort((a,b)=> Number(b.mrp || 0)  - Number(a.mrp || 0));
    //     setList(sortedList)
    // }

  return (
    <TableContainer
      fontSize={"sm"}
      marginY={8}
      style={{ maxHeight: "calc(100vh - 150px)", minHeight: "auto" }}
      overflowY={"auto"}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Heading marginY={3} fontSize={"xl"} as={"h2"}>
          {searchFor && "Search result for: " + searchFor}
        </Heading>
        {/* <Select placeholder="Sort by" width={"min-content"}>
          <select value="mrp">Price</select>
        </Select> */}
      </Box>
      <Table variant="striped" className="sticky-header">
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {medicines.map((medicine) => {
            return (
              <Tr key={medicine.id}>
                <Td>{medicine.brand_name}</Td>
                <Td>{medicine.company_name}</Td>
                <Td>{medicine.dosage_form}</Td>
                <Td>{medicine.formulation}</Td>
                <Td>{medicine.mrp}</Td>
                <Td>{medicine.pack_size}</Td>
                <Td>{medicine.reg_no}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MedicinesTable;
