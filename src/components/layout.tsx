import { Grid, GridItem } from "@chakra-ui/react"

import Header from "./Header"
import SearchSide from "./SearchSide"
import MedicinesTable from "./MedicinesTable"

const Layout = () => {
    return (
        <Grid
            templateAreas={`
                "header header"
                 "search main"
            `}
            gridTemplateRows={'75px 1fr'}
            gridTemplateColumns={".4fr 1fr"}
            height={'100vh'}
            gap={1}
            bg={"gray.50"}
        >
            <GridItem area={"header"}>
                <Header/>
            </GridItem>
            <GridItem p={5} area={"search"}>
                <SearchSide/>
            </GridItem>
            <GridItem height={"full"} px={3} area={'main'}>
                <MedicinesTable/>
            </GridItem>
        </Grid>
    )
}

export default Layout