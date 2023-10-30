import { Button, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import { useState } from "react";
import LoginForm from "./LoginForm";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <HStack shadow={"base"} px={4} height={"100%"} alignItems={"center"} justify={"space-between"}>
            <Text>Logo</Text>
            <Button
                colorScheme='cyan'
                color={"white"}
                onClick={()=> setShowLogin(true)}
            >
                Login
            </Button>
            <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <LoginForm/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </HStack>
    )
}

export default Header;