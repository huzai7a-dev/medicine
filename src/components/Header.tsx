import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Image,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import Logo from "../assets/icons/logo-color.svg";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <HStack
      shadow={"base"}
      px={4}
      height={"100%"}
      alignItems={"center"}
      justify={"space-between"}
    >
  <ChakraLink as={ReactRouterLink} to="/" >
  <Image
    src={Logo}
    alt="med-logo"
    height={10}
    width={10}
    borderRadius="50%"
  />
</ChakraLink>
      <Flex gap={"30px"} alignItems={"baseline"}>
        <ChakraLink
          as={ReactRouterLink}
          to="/search-by"
        >
          Search By
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/search-prescription">
          Prescription
        </ChakraLink>
        <Button
          colorScheme="cyan"
          color={"white"}
          onClick={() => setShowLogin(true)}
        >
          Login
        </Button>
      </Flex>
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
