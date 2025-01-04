import React, { useEffect, useState } from "react";
import { Box, Button, Spinner, useToast, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EventFormFields } from "./EventFormFields";

export const AddEventForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: "",
		startTime: "",
		endTime: "",
		createdBy: "",
		categoryIds: [],
	});
	const [creators, setCreators] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [usersResponse, categoriesResponse] = await Promise.all([
					fetch("http://localhost:3000/users"),
					fetch("http://localhost:3000/categories"),
				]);

				if (!usersResponse.ok || !categoriesResponse.ok) {
					throw new Error("Failed to fetch data");
				}

				const usersData = await usersResponse.json();
				const categoriesData = await categoriesResponse.json();

				setCreators(usersData);
				setCategories(categoriesData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle category checkbox selection
	const handleCategoryChange = (selected) => {
		setFormData({ ...formData, categoryIds: selected });
	};

	// Submit form data
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/events", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...formData,
					categoryIds: formData.categoryIds.map((id) => parseInt(id, 10)),
				}),
			});

			if (!response.ok) throw new Error("Failed to add event");

			toast({ title: "Event added successfully", status: "success", duration: 3000 });
			navigate("/");
		} catch (error) {
			toast({ title: "Failed to add event", description: error.message, status: "error", duration: 3000 });
		}
	};

	if (loading) return <Spinner size="xl" />;
	if (error) return <Text color="red.500">{error}</Text>;

	return (
		<Box p={6} bg="white" boxShadow="md" borderRadius="md" maxWidth="600px" mx="auto">
			<form onSubmit={handleSubmit}>
				<EventFormFields
					formData={formData}
					handleChange={handleChange}
					handleCategoryChange={handleCategoryChange}
					creators={creators}
					categories={categories}
				/>
				<Button type="submit" colorScheme="teal" mt={4}>
					Add Event
				</Button>
			</form>
		</Box>
	);
};
