import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

export const Navigation = () => {
	return (
		<Box bg="brand.500" p={3} mb={4} boxShadow="md">
			<Flex justify={["center", "space-evenly"]} flexDirection={["column", "row"]} gap={4}>
				<Button as={Link} to="/" colorScheme="yellow" variant="solid">
					Explore Events
				</Button>
				<Button as={Link} to="/add-event" colorScheme="yellow" variant="solid">
					Add Event
				</Button>
				<Button
					as="a"
					href="https://www.youtube.com/watch?v=StKVS0eI85I"
					target="_blank"
					rel="noopener noreferrer"
					colorScheme="yellow"
					variant="solid"
				>
					Contact
				</Button>
			</Flex>
		</Box>
	);
};
