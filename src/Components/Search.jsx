import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Content from "./Content";
import Navbar from "./Navbar";
import "../Styles/Search.scss";

const Search = () => {
	const { query } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${query}`
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setData(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [query]);

	return (
		<div>
			<Navbar />
			<div id="searchTitle">
				<div className="container">
					<h1 className="titleText">
						Showing Results for:{" "}
						<span className="query">{query}</span>
					</h1>
				</div>
			</div>
			<Content
				data={data}
				loading={loading}
				error={error}
				img_path={IMG_PATH}
			/>
		</div>
	);
};

export default Search;
