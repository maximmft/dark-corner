import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdDetail from "./pages/AdDetail/AdDetail.tsx";
import RecentAds from "./components/RecentAds.tsx";
import { CategoryAds } from "./pages/CategoryAds/CategoryAds.tsx";
import AdCreateForm from "./pages/AdCreateForm/AdCreateForm.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <RecentAds />,
			},
			{
				path: "/about",
				element: <p>About</p>,
			},
			{
				path: "/ads/:adId",
				element: <AdDetail />,
			},
			{
				path: "/:name",
				element: <CategoryAds/>,
			},
			{
				path: "/form",
				element: <AdCreateForm/>,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);