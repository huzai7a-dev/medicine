import { Box, Button, Card, CardBody, CardHeader, Input, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { searchByCriteria } from "../services";
import { useMedicineStore } from "../store";
import { useNavigate } from "react-router-dom";


const searches = [
    {
        value: "brand_name",
        title: "Brand"
    },
    {
        value: "company_name",
        title: "Company"
    },
    {
        value: "formulation",
        title: "Generics"
    }
];


const SearchBy = () => {
    const [findBy, setFindBy] = useState('');
    const [searchText, setSearchText] = useState('');
    const loadMedicines = useMedicineStore((store) => store.loadMedicines);
    const navigate = useNavigate();

    const findMedicine = async () => {
        try {
            const response = await searchByCriteria(findBy, searchText);
            loadMedicines(response.data,response.search);
            navigate('/search-by');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Card height={140}>
            <CardHeader py={2}>
                <Text fontWeight={"bold"} fontSize={"md"}>Search By:</Text>
            </CardHeader>
            <CardBody py={0}>
                <Select
                    onChange={(e) => setFindBy(e.target.value)}
                    placeholder="Search..."
                >
                    {searches.map((search) => (
                        <option key={search.value} value={search.value}>{search.title}</option>
                    ))}
                </Select>

                <Box display={"flex"} gap={"2"} marginTop={"2"}>
                    <Input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={findMedicine}>Search</Button>
                </Box>
            </CardBody>
        </Card>
    )
}
export default SearchBy;