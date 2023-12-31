import { Grid, GridItem } from "@chakra-ui/react";

import SearchSide from "./SearchSide";

interface InnerLayoutProps {
  children: React.ReactNode;
  aside: string;
}
const InnerLayout = ({ children, aside }: InnerLayoutProps) => {
  return (
    <Grid
      templateAreas={`
                 "aside main"
            `}
      gridTemplateRows={"1fr"}
      gridTemplateColumns={".3fr 1fr"}
    >
      <GridItem area={"aside"}>
        <SearchSide sideSection={aside} />
      </GridItem>
      <GridItem
        overflowX={"auto"}
        height={"full"}
        maxWidth={"full"}
        px={3}
        area={"main"}
      >
        {children}
      </GridItem>
    </Grid>
  );
};

export default InnerLayout;
