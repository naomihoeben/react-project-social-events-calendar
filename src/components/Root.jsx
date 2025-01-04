import React from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "./layout/Header";
import { Navigation } from "./layout/Navigation";
import { Footer } from "./layout/Footer";
import { Routes, Route } from "react-router-dom";
import { EventsPage } from "../pages/EventsPage";
import { EventPage } from "../pages/EventPage";
import { AddEventForm } from "./event-management/AddEventForm";

export const Root = () => {
	return (
		<Box
			maxWidth="1300px"
			mx="auto"
			p={4}
			bg="pink.300"
			boxShadow="lg"
			borderRadius="lg"
			position="relative"
			_before={{
				// Just for fun: some dotted lines around the box
				content: '""',
				position: "absolute",
				top: "-8px",
				bottom: "-10px",
				left: "-12px",
				right: "-15px",
				border: "20px dotted white",
				borderRadius: "lg",
				zIndex: -1,
			}}
		>
			<Header />
			<Navigation />
			<Box mb={10}>
				<Routes>
					<Route path="/" element={<EventsPage />} />
					<Route path="event/:eventId" element={<EventPage />} />
					<Route path="add-event" element={<AddEventForm />} />
					<Route path="*" element={<h1>404 - Page Not Found</h1>} />
				</Routes>
			</Box>
			<Footer />
		</Box>
	);
};
