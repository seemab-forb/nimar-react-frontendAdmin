import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center w-full h-screen">
			<div className="text-center">
				<h1 className="text-6xl font-bold">404</h1>
				<p className="text-xl">Page not found</p>
				<button
					type="button"
					className="px-3 py-2 mt-5 text-white bg-blue-500 rounded-md"
					onClick={() => navigate("/")}
				>
					Go to home
				</button>
			</div>
		</div>
	);
}
export default NotFound;
