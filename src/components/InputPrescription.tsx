import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, CardBody, HStack, IconButton, Input } from "@chakra-ui/react"
import { forwardRef, useImperativeHandle, useState } from "react";
import { searchPriscription } from "../services";

interface InputField {
    id: number;
    value: string;
}

export interface InputPrescriptionRef {
    searchiPrescription: () => void;
}

const InputPrescription = forwardRef<InputPrescriptionRef>((props,ref) => {
    const [inputs, setInputs] = useState<InputField[]>([{ id: 1, value: '' }]);

    useImperativeHandle(ref, () => ({
        async searchiPrescription() {
            try {
                const res = await searchPriscription(getInputValues());
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
    }));

    const handleInputChange = (id:number, newValue:string) => {
        setInputs(inputs => inputs.map(input => 
            input.id === id ? { ...input, value: newValue } : input
        ));
    };

    const addInput = () => {
        const newId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 1;
        setInputs([...inputs, { id: newId, value: '' }]);
    }

    const removeInput = (id:number) => {
        setInputs(inputs => inputs.filter(input => input.id !== id));
    }

     const getInputValues = () => {
         return inputs.map(input => input.value);
     }

    return (
        <Box position={"relative"}>
            <CardBody py={3}>
                {inputs.map(({ id, value }) => (
                    <HStack key={id}>
                        <Input 
                            marginY={2} 
                            value={value}
                            onChange={(e) => handleInputChange(id, e.target.value)}
                        />
                        {id > 1 && (
                            <IconButton
                                colorScheme='red'
                                aria-label='Remove input'
                                icon={<DeleteIcon />}
                                onClick={() => removeInput(id)}
                            />
                        )}
                    </HStack>
                ))}
                <Button
                    width={"full"}
                    mb={10}
                    mt={2}
                    onClick={addInput}
                >
                    Add
                </Button>
            </CardBody>
        </Box>
    )
})

export default InputPrescription;
