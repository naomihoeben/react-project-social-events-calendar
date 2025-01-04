import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast,
} from "@chakra-ui/react";
import { EventFormFields } from "./EventFormFields";

export const EditEventModal = ({ isOpen, onClose, event, onSave }) => {
	const [formData, setFormData] = useState(event);
	const [creators, setCreators] = useState([]);
	const [categories, setCategories] = useState([]);
	const toast = useToast();

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const [creatorsResponse, categoriesResponse] = await Promise.all([
					fetch("http://localhost:3000/users"),
					fetch("http://localhost:3000/categories"),
				]);

				if (!creatorsResponse.ok || !categoriesResponse.ok) throw new Error("Failed to fetch creators or categories");

				const creatorsData = await creatorsResponse.json();
				const categoriesData = await categoriesResponse.json();

				setCreators(creatorsData);
				setCategories(categoriesData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOptions();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (selectedCategories) => {
		setFormData((prev) => ({ ...prev, categoryIds: selectedCategories }));
	};

	const handleSubmit = async () => {
		try {
			await onSave(formData);
			toast({
				title: "Event updated successfully!",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			onClose();
		} catch (error) {
			toast({
				title: "Failed to update event",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Event</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<EventFormFields
						formData={formData}
						handleChange={handleChange}
						isEdit
						creators={creators}
						categories={categories}
						handleCategoryChange={handleCategoryChange}
					/>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" onClick={handleSubmit}>
						Save Changes
					</Button>
					<Button variant="ghost" onClick={onClose} ml={3}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
