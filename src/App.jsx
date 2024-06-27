import React, { useState, useEffect, useCallback } from "react";
import "./App.scss";
import Navbar from "./Components/Navbar";
import Content from "./Components/Content";
import Pagination from "./Components/Pagination";

function App() {
	const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);

	const fetchMovies = useCallback(() => {
		setLoading(true);
		setError(null);

		const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`;

		fetch(API_URL)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [page]);

	useEffect(() => {
		const debounceFetch = setTimeout(() => {
			fetchMovies();
		}, 500);

		return () => clearTimeout(debounceFetch);
	}, [fetchMovies]);

	const handlePageChange = (input) => {
		setPage(input);
	};

	return (
		<div className="App">
			<Navbar />
			<Content
				data={data}
				loading={loading}
				error={error}
				img_path={IMG_PATH}
			/>
			<Pagination onPageChange={handlePageChange} currentPage={page} />
		</div>
	);
}

export default App;
