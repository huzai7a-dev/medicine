import SearchBy from "./SearchBy";
import InputPrescription from "./SearchPrescription";
import { Stack } from "@chakra-ui/react";

const SearchSide = () => {
    return (
        <Stack>
            <SearchBy />
            <InputPrescription/>
        </Stack>
    )
}
export default SearchSide;