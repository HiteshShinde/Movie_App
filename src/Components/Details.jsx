import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFilm,
	faCalendarDays,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import "../Styles/Details.scss";

const Details = () => {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [imgPath, setImgPath] = useState("");
	const detailsRef = useRef(null);
	const backdropRef = useRef(null);
	const navRef = useRef(null);
	const cardRef = useRef(null);
	const dateRef = useRef(null);
	const voteRef = useRef(null);
	const titleRef = useRef(null);

	useEffect(() => {
		const storedItem = localStorage.getItem("selectedMovie");
		const storedImgPath = localStorage.getItem("imgPath");

		if (storedItem && storedImgPath) {
			const myItem = JSON.parse(storedItem);

			if (myItem.id.toString() === id) {
				setItem(myItem);
				setImgPath(storedImgPath);
			} else {
				console.log(`ID mismatch: ${myItem.id} !== ${id}`);
			}
		}
	}, [id]);

	useEffect(() => {
		if (item) {
			const mytl = gsap.timeline({ repeat: 0, repeatDelay: 0, delay: 0 });
			mytl.fromTo(
				navRef.current,
				{ opacity: 0, y: -50 },
				{ opacity: 1, y: 0, duration: 0.7 }
			);

			mytl.fromTo(
				detailsRef.current,
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 0.7 },
				"-=1"
			);

			mytl.fromTo(
				backdropRef.current,
				{ scale: 4, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.7 },
				"-=0.5"
			);

			mytl.fromTo(
				cardRef.current,
				{ scale: 0, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.7 },
				"-=0.5"
			);

			mytl.fromTo(
				titleRef.current,
				{ x: 50, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.7 },
				"-=0.5"
			);

			mytl.fromTo(
				dateRef.current,
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.7 },
				"-=0.5"
			);

			mytl.fromTo(
				voteRef.current,
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.7 },
				"-=0.5"
			);
		}
	}, [item]);

	if (!item) {
		return <div>No data available</div>;
	}

	const backdrop = imgPath + item.backdrop_path;
	const poster = item.poster_path
		? imgPath + item.poster_path
		: "https://s.hcurvecdn.com/movieflix/default.webp";

	return (
		<div className="App">
			<Navbar ref={navRef} />
			<section id="details" ref={detailsRef}>
				<div className="backdropContainer">
					<div
						className="backdropImg"
						style={{ backgroundImage: `url(${backdrop})` }}
						ref={backdropRef}
					></div>
				</div>

				<div id="detailsContent" className="container">
					<img
						src={poster}
						alt={item.title}
						className="poster"
						ref={cardRef}
					/>

					<div className="movieDetails">
						<h1 className="mainTitle" ref={titleRef}>
							<FontAwesomeIcon icon={faFilm} className="icon" />
							{item.title}
						</h1>

						<div className="info">
							<h3 className="date" ref={dateRef}>
								<FontAwesomeIcon
									icon={faCalendarDays}
									className="calIcon"
								/>
								{item.release_date}
							</h3>

							<h3 className="date" ref={voteRef}>
								<FontAwesomeIcon
									icon={faStar}
									className="starIcon"
								/>
								<div className="votes">
									{Number(item.vote_average).toFixed(1)}{" "}
									<span className="voteCount">
										({item.vote_count})
									</span>
								</div>
							</h3>
						</div>
					</div>
				</div>

				<div id="overview" className="container">
					<h1 className="title">Story Overview:</h1>
					<h4 className="overview_text">{item.overview}</h4>
				</div>
			</section>
		</div>
	);
};

export default Details;
