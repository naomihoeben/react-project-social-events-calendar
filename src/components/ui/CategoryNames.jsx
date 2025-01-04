import React from "react";
import { Box } from "@chakra-ui/react";

export const CategoryNames = ({ categoryIds, categories }) => {
	const resolvedCategoryNames = categoryIds
		.map((id) => {
			const category = categories.find((cat) => cat.id === id);
			return category ? category.name : null;
		})
		.filter(Boolean)
		.join(", ");

	return <Box as="span">Categories: {resolvedCategoryNames || "None"}</Box>;
};
