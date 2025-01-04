import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const DeleteButton = ({ eventId, onDelete }) => {
	const navigate = useNavigate();
	const toast = useToast();

	const handleDelete = async () => {
		const confirmDelete = window.confirm("Are you sure you want to delete this event?");
		if (!confirmDelete) {
			toast({ title: "Event deletion canceled", status: "info", duration: 3000 });
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/events/${eventId}`, { method: "DELETE" });
			if (!response.ok) throw new Error("Failed to delete the event.");
			toast({ title: "Event deleted successfully", status: "success", duration: 3000 });
			onDelete();
			navigate("/");
		} catch (error) {
			toast({ title: "Deletion failed", description: error.message, status: "error", duration: 3000 });
		}
	};

	return (
		<Button colorScheme="red" onClick={handleDelete}>
			Delete Event
		</Button>
	);
};
