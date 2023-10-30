import { Box, Image, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillCamera } from 'react-icons/ai';
const UploadPrescription = () => {
    const [image, setImage] = useState<File | undefined>();

    return (
        <>
            <Box
                width={"100%"}
                height={"150px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                shadow={"base"}
                cursor={"pointer"}
                position={"relative"}
            >
                {image ? (
                    <Image
                        src={URL.createObjectURL(image)}
                        width={"100%"}
                        maxHeight={"100%"}
                        height={"auto"}
                        objectFit={"fill"}
                    />
                ) : (
                    <>
                        <AiFillCamera size={30} />
                        <Text fontWeight={"thin"}>Upload Prescription Image</Text>
                        <Input
                            height={"100%"}
                            type="file"
                            opacity={0}
                            position={"absolute"}
                            cursor={"pointer"}
                            onChange={(e) => setImage(e.target.files && e?.target?.files[0] || undefined)}
                        />
                    </>
                )}
            </Box>
        </>
    )
}

export default UploadPrescription;