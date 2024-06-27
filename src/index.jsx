import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Details from "./Components/Details";
import Search from "./Components/Search";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "details/:id",
		element: <Details />,
	},
	{
		path: "search/:query",
		element: <Search />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();
