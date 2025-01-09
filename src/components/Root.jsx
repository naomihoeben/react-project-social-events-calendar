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
			borderLeft={["5px dotted white", "15px dotted white"]}
			borderRight={["5px dotted white", "15px dotted white"]}
		>
			<Box bg="pink.300" boxShadow="lg" borderRadius="lg" position="relative" overflow="hidden">
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
		</Box>
	);
};
