import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryNames } from "../components/ui/CategoryNames";
import { Box, Heading, Flex, Spinner, Text, Input, Checkbox, CheckboxGroup, Stack, Image } from "@chakra-ui/react";

export const EventsPage = () => {
	const [events, setEvents] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const eventsResponse = await fetch("http://localhost:3000/events");
				const categoriesResponse = await fetch("http://localhost:3000/categories");

				if (!eventsResponse.ok || !categoriesResponse.ok) {
					throw new Error("Failed to fetch data");
				}

				const eventsData = await eventsResponse.json();
				const categoriesData = await categoriesResponse.json();

				// Fallback for missing creator details
				const updatedEvents = await Promise.all(
					eventsData.map(async (event) => {
						if (event.createdBy) {
							try {
								const creatorResponse = await fetch(`http://localhost:3000/users/${event.createdBy}`);
								if (!creatorResponse.ok) throw new Error();
								const creatorData = await creatorResponse.json();
								return { ...event, creator: creatorData };
							} catch {
								return { ...event, creator: { name: "Creator not found", image: "" } };
							}
						}
						return { ...event, creator: { name: "Creator not found", image: "" } };
					})
				);

				setEvents(updatedEvents);
				setCategories(categoriesData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredEvents = events.filter((event) => {
		const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategories =
			selectedCategories.length === 0 || event.categoryIds.some((id) => selectedCategories.includes(id.toString()));

		return matchesSearch && matchesCategories;
	});

	if (loading) return <Spinner size="xl" />;
	if (error) return <Text color="red.500">{error}</Text>;

	const placeholderEventImage = "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png";

	return (
		<Flex direction={{ base: "column", lg: "row" }} gap={6} p={4}>
			<Box width={{ base: "100%", lg: "25%" }}>
				<Heading mb={4} size="md">
					Search & Filter
				</Heading>
				<Input
					placeholder="Search events..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					mb={4}
					bg="white"
					border="2px solid"
					borderColor="brand.500"
				/>
				<CheckboxGroup value={selectedCategories} onChange={(values) => setSelectedCategories(values)}>
					<Stack direction="column" spacing={2}>
						{categories.map((category) => (
							<Checkbox key={category.id} value={category.id.toString()}>
								{category.name}
							</Checkbox>
						))}
					</Stack>
				</CheckboxGroup>
			</Box>
			<Box flex="1">
				<Heading mb={4}>List of Events</Heading>
				<Flex wrap="wrap" gap={4}>
					{filteredEvents.map((event) => (
						<Box
							key={event.id}
							bg="white"
							borderRadius="md"
							border="1px solid"
							borderColor="brand.500"
							boxShadow="md"
							overflow="hidden"
							onClick={() => navigate(`/event/${event.id}`)}
							cursor="pointer"
							width="280px"
							textAlign="center"
							transition="transform 0.2s"
							_hover={{ transform: "scale(1.05)" }}
						>
							<Image
								src={event.image || placeholderEventImage}
								alt={event.title}
								width="100%"
								height="150px"
								objectFit="cover"
							/>
							<Stack p={3} spacing={2}>
								<Text fontSize="xl" fontWeight="bold">
									{event.title}
								</Text>
								<Text fontSize="sm" color="gray.500">
									{`${new Date(event.startTime).getDate()}-${new Date(event.startTime).getMonth() + 1}-${new Date(
										event.startTime
									).getFullYear()}, ${new Date(event.startTime).toLocaleTimeString("en-GB", {
										hour: "2-digit",
										minute: "2-digit",
									})} - ${new Date(event.endTime).toLocaleTimeString("en-GB", {
										hour: "2-digit",
										minute: "2-digit",
									})}`}
								</Text>
								<Text fontSize="md">{event.description}</Text>
								<Text mt={4} fontWeight="bold">
									<CategoryNames categoryIds={event.categoryIds} categories={categories} />
								</Text>
							</Stack>
						</Box>
					))}
				</Flex>
			</Box>
		</Flex>
	);
};
