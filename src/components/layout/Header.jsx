import React from "react";
import { Box, Heading, Text, useTheme } from "@chakra-ui/react";

export const Header = () => {
	const theme = useTheme();
	const brand500 = theme.colors.brand[500];

	return (
		<Box
			as="header"
			bgImage="url('https://www.shutterstock.com/image-photo/clear-blue-sky-few-clouds-600nw-2488278533.jpg')"
			bgPosition="center"
			bgSize="cover"
			bgRepeat="no-repeat"
			color="white"
			py={8}
			px={4}
			textAlign="center"
			boxShadow="lg"
			mb={0}
		>
			<Heading
				as="h1"
				size="2xl"
				mb={4}
				color="brand.500"
				style={{
					textShadow: `-1px 0 yellow, 0 1px yellow, 1px 0 yellow, 0 -1px yellow`,
				}}
			>
				SOCIAL EVENTS CALENDAR
			</Heading>
			<Text
				fontSize="lg"
				mb={6}
				color="yellow"
				style={{
					textShadow: `-1px 0 ${brand500}, 0 1px ${brand500}, 1px 0 ${brand500}, 0 -1px ${brand500}`,
				}}
			>
				Plan, organize, and explore your favorite events!
			</Text>
		</Box>
	);
};
