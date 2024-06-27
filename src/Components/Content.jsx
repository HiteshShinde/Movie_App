import Card from "./Card";
import { Link } from "react-router-dom";
import "../Styles/Content.scss";

const Content = (props) => {
	if (props.loading) {
		return <div>Loading...</div>;
	}

	if (props.error) {
		return <div>Error: {props.error}</div>;
	}

	const handleCardClick = (item, imgPath) => {
		localStorage.setItem("selectedMovie", JSON.stringify(item));
		localStorage.setItem("imgPath", imgPath);
	};

	return (
		<section id="showcase">
			<div className="container">
				{props.data.results.map((el) => {
					const posterUrl = el.poster_path
						? props.img_path + el.poster_path
						: "https://s.hcurvecdn.com/movieflix/default.webp";
					return (
						<Link
							key={el.id}
							to={`/details/${el.id}`}
							onClick={() => handleCardClick(el, props.img_path)}
							style={{ textDecoration: "none" }}
						>
							<Card
								poster={posterUrl}
								title={el.title}
								rating={el.vote_average}
								overview={el.overview}
							/>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default Content;
