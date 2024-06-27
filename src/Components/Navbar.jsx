import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Styles/Navbar.scss";

const Navbar = forwardRef((props, ref) => {
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();

	const handleInput = (event) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate(`/search/${inputValue}`);
	};

	return (
		<nav id="navbar" ref={ref}>
			<div className="container">
				<Link to={`/`}>
					<h1 id="logo">MovieFlix</h1>
				</Link>

				<form id="search" action="" onSubmit={handleSubmit}>
					<input
						type="text"
						name="Search"
						id="search_input"
						placeholder="Search"
						onChange={handleInput}
						value={inputValue}
					/>

					<button type="submit" id="submit">
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</form>
			</div>
		</nav>
	);
});

export default Navbar;
