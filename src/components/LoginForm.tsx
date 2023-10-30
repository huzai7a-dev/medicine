import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LoginForm = () => {
    return (
        <FormControl p={5}>
            <Box display={"flex"} flexDir={"column"} gap={5}>
                <Box>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                </Box>
                <Box>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
                </Box>
                <Button colorScheme="cyan" color={"white"}>Login</Button>
            </Box>
        </FormControl>
    )
}

export default LoginForm;