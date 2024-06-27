import { useState } from "react";
import "../Styles/Card.scss";

const Card = (props) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	let colorClass;
	if (props.rating < 5) {
		colorClass = "red";
	} else if (props.rating < 7) {
		colorClass = "orange";
	} else {
		colorClass = "green";
	}

	return (
		<div className="card">
			{imageLoaded && props.poster ? (
				<img
					src={props.poster}
					alt="poster"
					className="poster"
					onLoad={handleImageLoad}
				/>
			) : (
				<img
					src={"https://s.hcurvecdn.com/movieflix/default.webp"}
					alt="poster"
					className="poster"
					onLoad={handleImageLoad}
				/>
			)}

			<div className="movieInfo">
				<h3 className="title">{props.title}</h3>
				<h5 className={`rating ${colorClass}`}>{props.rating}</h5>
			</div>

			<div className="overview">
				<h2>Overview</h2>
				<h4>{props.overview}</h4>
			</div>
		</div>
	);
};

export default Card;
