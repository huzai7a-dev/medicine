import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue,
  Icon,
  Divider,
  useToken,
} from "@chakra-ui/react";
import { MdLocalPharmacy } from "react-icons/md";

const HomePage = () => {
  // Accessing theme tokens for consistent styling
  const [cyan600, cyan300] = useToken("colors", ["cyan.600", "cyan.300"]);

  // Background gradient
  const bgGradient = `linear(to-l, ${cyan600}, ${cyan300})`;

  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Container maxW="container.xl" p={4} centerContent>
      <Box
        bgGradient={bgGradient}
        p={10}
        borderRadius="lg"
        boxShadow="xl"
        color="white"
        textAlign="center"
        mb={10}
        w="full"
      >
        <Icon as={MdLocalPharmacy} w={10} h={10} mb={3} />
        <Heading as="h1" size="2xl">
          Medicine Substitute System Project
        </Heading>
        <Text fontSize="xl" fontWeight="bold" mt={3}>
          Revolutionizing Access to Affordable Medication
        </Text>
      </Box>
      <VStack
        spacing={5}
        align="stretch"
        w="full"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        color={textColor}
      >
        <Text fontSize="md">
          At IBA Karachi, under the guidance of Dr. Waqas Mehmood, we're proud
          to introduce our groundbreaking project: the Medicine Substitute
          System. This initiative is more than just a technical achievement;
          it's a step towards making healthcare more accessible and affordable
          for everyone.
        </Text>
        <Divider my={5} />
        <Text fontSize="md">
          In an era where medical expenses are constantly rising, our system
          offers a beacon of hope. It's designed to help patients find
          cost-effective substitutes for expensive medications, ensuring that
          financial constraints don't compromise one's health. Our focus is on
          building a platform that is not only user-friendly but also deeply
          rooted in ethical practices and the utmost accuracy.
        </Text>
        <Text fontSize="md">
          Join us on this journey as we strive to make a difference in the lives
          of many, one substitute medication at a time. Stay tuned for more
          updates and insights into how we're transforming the landscape of
          healthcare accessibility in Pakistan.
        </Text>
        <Box textAlign="center" pt={5}>
          <Button color={"white"} colorScheme="cyan" size="lg">
            Learn More
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;
