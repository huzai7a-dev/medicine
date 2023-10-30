import { Card, CardBody, CardHeader, Select, Text } from "@chakra-ui/react";


const searches = [
    {
        value: "brand",
        title: "Brand"
    },
    {
        value: "company",
        title: "Company"
    },
    {
        value: "generics",
        title: "Generics"
    }
];


const SearchBy = () => {
    return (
        <Card height={120}>
        <CardHeader py={3}>
            <Text fontWeight={"bold"} fontSize={"xl"}>Search By:</Text>
        </CardHeader>
        <CardBody py={3}>
            <Select placeholder="Search...">
                {searches.map((search) => (
                    <option key={search.value} value={search.value}>{search.title}</option>
                ))}
            </Select>
        </CardBody>
    </Card>
    )
}
export default SearchBy;