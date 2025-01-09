import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

export const DeleteButton = ({ eventId, eventTitle, onDelete }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const toast = useToast();

	const handleDelete = async () => {
		try {
			const response = await fetch(`http://localhost:3000/events/${eventId}`, { method: "DELETE" });
			if (!response.ok) throw new Error("Failed to delete the event.");
			toast({ title: "Event deleted successfully", status: "success", duration: 3000 });
			onDelete();
			navigate("/");
		} catch (error) {
			toast({ title: "Deletion failed", description: error.message, status: "error", duration: 3000 });
		} finally {
			setIsModalOpen(false);
		}
	};

	return (
		<>
			<Button colorScheme="red" onClick={() => setIsModalOpen(true)}>
				Delete Event
			</Button>
			<DeleteConfirmationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleDelete}
				eventTitle={eventTitle}
			/>
		</>
	);
};
