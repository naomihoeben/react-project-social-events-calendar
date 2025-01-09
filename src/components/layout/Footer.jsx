import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
	return (
		<Box as="footer" bg="brand.500" color="white" py={4} textAlign="center" boxShadow="md">
			<Text>
				&copy; {new Date().getFullYear()} Social Events Calendar by Naomi Hoeben. Inspired by Legally Blonde. Forgive
				me.
			</Text>
		</Box>
	);
};
