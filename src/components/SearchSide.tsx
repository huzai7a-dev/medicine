import SearchBy from "./SearchBy";
import SearchPrescription from "./SearchPrescription";
import { Stack } from "@chakra-ui/react";

interface Props {
    sideSection: string;
}

const SearchSide = ({ sideSection }: Props) => {
  return (
    <Stack margin={8}>
      {sideSection === "searchBy" ? <SearchBy /> : <SearchPrescription />}
    </Stack>
  );
};
export default SearchSide;
