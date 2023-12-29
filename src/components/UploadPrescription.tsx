import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import { AiFillCamera } from "react-icons/ai";

import { uploadPrescription } from "../services";
import { useMedicineGroups } from "../store/medicine";
import { useLoader } from "../store/app";
const UploadPrescription = () => {
  const [image, setImage] = useState<File | undefined>();
  const navigate = useNavigate();
  const setLoading = useLoader((store) => store.setLoading);

  const { loadGroup } = useMedicineGroups((store) => ({
    loadGroup: store.loadGroups,
  }));

  const handleSearch = async () => {
    try {
      if (image) {
        setLoading(true);
        navigate("/search-prescription");
        const response = await uploadPrescription(image);
        loadGroup(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
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
              onChange={(e) =>
                setImage((e.target.files && e?.target?.files[0]) || undefined)
              }
            />
          </>
        )}
      </Box>
      <Button width={"full"} marginTop={4} onClick={handleSearch}>
        Upload
      </Button>
    </div>
  );
};

export default UploadPrescription;
