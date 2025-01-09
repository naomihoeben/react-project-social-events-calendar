import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	useToast,
} from "@chakra-ui/react";

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, eventTitle }) => {
	const toast = useToast();

	const handleCancel = () => {
		toast({
			title: "Event deletion canceled",
			status: "info",
			duration: 3000,
			isClosable: true,
		});
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCancel}>
			<ModalOverlay />
			<ModalContent mt="10vh">
				{" "}
				<ModalHeader>Confirm Delete</ModalHeader>
				<ModalBody>
					<Text>
						Are you sure you want to delete the event <strong>{eventTitle || "this event"}</strong>? This action cannot
						be undone.
					</Text>
				</ModalBody>
				<ModalFooter justifyContent="flex-end">
					<Button variant="ghost" onClick={handleCancel} mr={3}>
						Cancel
					</Button>
					<Button colorScheme="red" onClick={onConfirm}>
						Delete
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
