import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Heading, Image, Text, Button, Spinner, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { EditEventModal } from "../components/event-management/EditEventModal";
import { DeleteButton } from "../components/event-management/DeleteEvent";
import { CategoryNames } from "../components/ui/CategoryNames";

export const EventPage = () => {
	const { eventId } = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [event, setEvent] = useState(null);
	const [creator, setCreator] = useState(null);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Ensure `useBreakpointValue` is called unconditionally
	const isMobile = useBreakpointValue({ base: true, md: false });

	useEffect(() => {
		const fetchEventDetails = async () => {
			try {
				const [eventResponse, categoriesResponse] = await Promise.all([
					fetch(`http://localhost:3000/events/${eventId}`),
					fetch(`http://localhost:3000/categories`),
				]);

				if (!eventResponse.ok || !categoriesResponse.ok) throw new Error("Failed to fetch data");

				const eventData = await eventResponse.json();
				const categoriesData = await categoriesResponse.json();

				setEvent(eventData);
				setCategories(categoriesData);

				const creatorResponse = await fetch(`http://localhost:3000/users/${eventData.createdBy}`);
				if (!creatorResponse.ok) throw new Error("Failed to fetch creator");
				const creatorData = await creatorResponse.json();
				setCreator(creatorData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEventDetails();
	}, [eventId]);

	const handleSave = async (updatedEvent) => {
		const response = await fetch(`http://localhost:3000/events/${eventId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedEvent),
		});

		if (response.ok) {
			const data = await response.json();
			setEvent(data);
		} else {
			throw new Error("Failed to update event");
		}
	};

	const formatDateTime = (startTime, endTime) => {
		const [startDate, startTimeValue] = startTime.split("T");
		const [, endTimeValue] = endTime.split("T");
		return `${startDate} from ${startTimeValue} until ${endTimeValue}`;
	};

	if (loading) return <Spinner size="xl" />;
	if (error) return <Text color="red.500">{error}</Text>;

	const placeholderCreatorImage =
		"https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg";
	const placeholderEventImage = "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png";

	return (
		<Box p={4}>
			<Stack spacing={6}>
				{/* Event title */}
				<Heading textAlign="center">{event.title || "Title not found"}</Heading>
				<Stack direction={isMobile ? "column" : "row"} spacing={6} alignItems={isMobile ? "flex-start" : "center"}>
					{/* Grouped content */}
					<Stack flex="1" spacing={4}>
						<Stack direction="row" alignItems="center" spacing={3}>
							<Image
								src={creator?.image || placeholderCreatorImage}
								alt={creator?.name || "Unknown creator"}
								borderRadius="full"
								boxSize="50px"
								objectFit="cover"
							/>
							<Text>
								Organized by <strong>{creator?.name || "Unknown"}</strong>
							</Text>
						</Stack>
						<Text>{event.description || "Description not found"}</Text>
						<Text fontWeight="bold">When: {formatDateTime(event.startTime, event.endTime)}</Text>
						<Text>
							<CategoryNames categoryIds={event.categoryIds} categories={categories} />
						</Text>
						{/* Buttons */}
						<Stack direction="row" spacing={4} mt={4}>
							<Button colorScheme="blue" onClick={onOpen}>
								Edit Event
							</Button>
							<DeleteButton eventId={eventId} onDelete={() => console.log("Event deleted!")} />
						</Stack>
					</Stack>
					{/* Event image */}
					<Image
						src={event.image || placeholderEventImage}
						alt={event.title || "Placeholder image"}
						maxHeight="400px"
						width={isMobile ? "100%" : "50%"}
						objectFit="cover"
						borderRadius="md"
					/>
				</Stack>
			</Stack>
			<EditEventModal isOpen={isOpen} onClose={onClose} event={event} onSave={handleSave} />
		</Box>
	);
};
