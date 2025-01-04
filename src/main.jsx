import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { ErrorBoundary } from "./components/error-handling/ErrorBoundary";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { AddEventForm } from "./components/event-management/AddEventForm";

import theme from "./theme/theme";

const router = createBrowserRouter([
	{
		path: "/", // ik had hier veel gerommel of het nu "/" of "*" moest zijn, dat begrijp ik nog niet helemaal.
		element: <Root />,
		children: [
			{ path: "/", element: <EventsPage /> },
			{ path: "event/:eventId", element: <EventPage /> },
			{ path: "add-event", element: <AddEventForm /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ErrorBoundary>
				<RouterProvider router={router} />
			</ErrorBoundary>
		</ChakraProvider>
	</React.StrictMode>
);
