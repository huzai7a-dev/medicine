import SearchBy from "./SearchBy";
import SearchPrescription from "./SearchPrescription";
import { Stack } from "@chakra-ui/react";

const SearchSide = () => {
    return (
        <Stack>
            <SearchBy />
            <SearchPrescription/>
        </Stack>
    )
}
export default SearchSide;