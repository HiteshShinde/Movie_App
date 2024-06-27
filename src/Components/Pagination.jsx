import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronCircleLeft,
	faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Pagination.scss";

const Pagination = ({ currentPage, onPageChange }) => {
	const totalPages = 500;
	const [currentRange, setCurrentRange] = useState([1, 5]);

	const handleClick = (event, pageNumber) => {
		event.preventDefault();
		onPageChange(pageNumber);
		updatePageRange(pageNumber);
	};

	const handlePrevClick = (event) => {
		event.preventDefault();
		if (currentPage > 1) {
			const newPage = currentPage - 1;
			onPageChange(newPage);
			updatePageRange(newPage);
		}
	};

	const handleNextClick = (event) => {
		event.preventDefault();
		if (currentPage < totalPages) {
			const newPage = currentPage + 1;
			onPageChange(newPage);
			updatePageRange(newPage);
		}
	};

	const updatePageRange = (pageNumber) => {
		let startPage = Math.max(1, pageNumber - 2);
		let endPage = Math.min(totalPages, startPage + 4);

		if (endPage - startPage < 4) {
			startPage = Math.max(1, endPage - 4);
		}

		setCurrentRange([startPage, endPage]);
	};

	useEffect(() => {
		updatePageRange(currentPage);
	}, [currentPage]);

	const pageNumbers = [];
	for (let i = currentRange[0]; i <= currentRange[1]; i++) {
		pageNumbers.push(i);
	}

	return (
		<section id="pagination">
			<div className="container">
				<div className="prevBtn pageBtn" onClick={handlePrevClick}>
					<FontAwesomeIcon icon={faChevronCircleLeft} />
				</div>

				<ul id="pages">
					{pageNumbers.map((pageNumber) => (
						<li
							key={pageNumber}
							className={`pg ${
								currentPage === pageNumber ? "active" : ""
							}`}
							onClick={(e) => handleClick(e, pageNumber)}
						>
							{pageNumber}
						</li>
					))}
				</ul>

				<div className="nextBtn pageBtn" onClick={handleNextClick}>
					<FontAwesomeIcon icon={faChevronCircleRight} />
				</div>
			</div>
		</section>
	);
};

export default Pagination;
