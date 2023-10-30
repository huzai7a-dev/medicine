import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, CardBody, HStack, IconButton, Input } from "@chakra-ui/react"
import { useState } from "react";

const InputPrescription = () => {
    const [inputs, setInputs] = useState([1]);

    const addInput = (num: number) => {
        setInputs(() => [...inputs, num + 1]);
    }
    const removeInput = (num : number) => {
        const filterArray = inputs.filter(curElm =>  curElm !== num)
        setInputs(filterArray)
    }
    return (
        <Box position={"relative"}>
            
            <CardBody py={3}>
                    {inputs.map((num) => (
                        <HStack key={num}>
                            <Input marginY={2} key={num} />
                            {num > 1 && (
                                <IconButton
                                    colorScheme='red'
                                    aria-label='Search database'
                                    icon={<DeleteIcon />}
                                    onClick={()=> removeInput(num)}
                                />
                            )}
                        </HStack>
                    ))}
                <Button
                    width={"full"}
                    mb={10}
                    mt={2}
                        onClick={() => addInput(inputs.length)}
                    >
                        Add
                    </Button>
                
            </CardBody>
        </Box>
    )
}

export default InputPrescription