import React from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Textarea,
	SimpleGrid,
	Select,
	Checkbox,
	CheckboxGroup,
	Stack,
} from "@chakra-ui/react";

export const EventFormFields = ({
	formData,
	handleChange,
	isEdit = false,
	creators = [],
	categories = [],
	handleCategoryChange,
}) => (
	<>
		<FormControl mb={4} isRequired>
			<FormLabel>Title</FormLabel>
			<Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter event title" />
		</FormControl>
		<FormControl mb={4} isRequired>
			<FormLabel>Description</FormLabel>
			<Textarea
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Enter event description"
			/>
		</FormControl>
		<FormControl mb={4}>
			<FormLabel>Image URL</FormLabel>
			<Input name="image" value={formData.image} onChange={handleChange} placeholder="Enter image URL" />
		</FormControl>
		<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
			<FormControl>
				<FormLabel>Start Time</FormLabel>
				<Input
					type="datetime-local"
					name="startTime"
					value={formData.startTime}
					onChange={handleChange}
					placeholder="yyyy-mm-dd hh:mm"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>End Time</FormLabel>
				<Input
					type="datetime-local"
					name="endTime"
					value={formData.endTime}
					onChange={handleChange}
					placeholder="yyyy-mm-dd hh:mm"
				/>
			</FormControl>
		</SimpleGrid>
		<FormControl mb={4}>
			<FormLabel>Creator</FormLabel>
			<Select name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Select creator">
				{creators.map((creator) => (
					<option key={creator.id} value={creator.id}>
						{creator.name}
					</option>
				))}
			</Select>
		</FormControl>
		<FormControl mb={4}>
			<FormLabel>Categories</FormLabel>
			<CheckboxGroup value={formData.categoryIds} onChange={(selected) => handleCategoryChange(selected)}>
				<Stack spacing={2}>
					{categories.map((category) => (
						<Checkbox key={category.id} value={String(category.id)}>
							{category.name}
						</Checkbox>
					))}
				</Stack>
			</CheckboxGroup>
		</FormControl>
	</>
);
