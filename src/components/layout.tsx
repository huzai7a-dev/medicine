import { Grid, GridItem } from "@chakra-ui/react";

import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid
      templateAreas={`
                "header header"
                 "main main"
            `}
      gridTemplateRows={"60px 1fr"}
      gridTemplateColumns={"1fr"}
      height={"100vh"}
      gap={1}
      bg={"green.50"}
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem
        overflowX={"auto"}
        height={"full"}
        maxWidth={"full"}
        px={3}
        area={"main"}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
