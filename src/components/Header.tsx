import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Image,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import Logo from "../assets/icons/logo.png";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <HStack display={"flex"} shadow={"base"} px={4} height={"100%"}>
      <ChakraLink as={ReactRouterLink} to="/">
        <Image src={Logo} alt="med-logo" height={100} width={100} />
      </ChakraLink>
      <Box paddingLeft={4} display={"flex"} flex={"1"} gap={4}>
        <ChakraLink
          as={ReactRouterLink}
          to="/search-by"
          _hover={{ textDecoration: "none" }}
        >
          <Button fontWeight={"medium"} variant={"ghost"}>
            Search By
          </Button>
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to="/search-prescription"
          _hover={{ textDecoration: "none" }}
        >
          <Button fontWeight={"medium"} variant={"ghost"}>
            Prescription
          </Button>
        </ChakraLink>
      </Box>
      <Button
        colorScheme="cyan"
        display={"flex"}
        color={"white"}
        onClick={() => setShowLogin(true)}
      >
        Login
      </Button>
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default Header;
