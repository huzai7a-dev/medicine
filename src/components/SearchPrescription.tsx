import { Box, Button, Card, CardHeader, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import InputPrescription from "./InputPrescription"
import UploadPrescription from "./UploadPrescription"


const SearchPrescription = () => {
    
    return (
        <Card
            position={"relative"}
            overflowY={"auto"}
        style={{ height: "calc(100vh - 85px - 0.25rem - 0.5rem - 150px)" }}
        >
            <CardHeader py={3}>
                <Text fontWeight={"bold"} fontSize={"xl"}>Prescription:</Text>
            </CardHeader>
            <Tabs variant='soft-rounded' colorScheme='cyan'>
                <TabList mx={2} display={"flex"} justifyContent={"space-between"}>
                    <Tab width={"100%"}>Search</Tab>
                    <Tab width={"100%"}>Upload</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <InputPrescription/>
                    </TabPanel>
                    <TabPanel>
                        <UploadPrescription/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Box
                position={"sticky"}
                px={3}
                bottom={3}
                width={"full"}
            >
                <Button width={"full"}>Search</Button>
            </Box>
        </Card>
    )
}

export default SearchPrescription