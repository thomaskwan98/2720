/**
 * CSCI2720/ESTR2106 Course Project
 * A Social Map of Events
 *
 * We declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * We also acknowledge that we are aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: TANG KING HEI <fill in for all members>
 * Student ID  : 1155126530 <fill in for all members>
 * Date        : 17/12/2022 <fill in yourself>

We have read the article carefully: http://www.cuhk.edu.hk/policy/academichonesty and include the required declaration

Group members:
TANG KING HEI 1155126530
ZIJUN QIU 1155160247
LIU YANG 1155141479
SU ZIE LEE 1155130593
KWAN LONG KIN 1155137891
LAI CHUEN FUNG 115514443
 */

import { useState } from "react";
import "./LocationList.css";
import { data } from "./culturalProgrammes";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function LocationList() {
	const [culturalProgrammes, setCulturalProgrammes] = useState(data);
	const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
	const [searchPhrase, setSearchPhrase] = useState("");

	const sortById = () => {
		const culturalProgrammesCopy = [...culturalProgrammes];
		culturalProgrammesCopy.sort((culturalProgrammeA, culturalProgrammeB) => {
			if (sorted.reversed) {
				return culturalProgrammeA.id - culturalProgrammeB.id;
			}
			return culturalProgrammeB.id - culturalProgrammeA.id;
		});
		setCulturalProgrammes(culturalProgrammesCopy);
		setSorted({ sorted: "id", reversed: !sorted.reversed });
	};

	const sortByName = () => {
		const culturalProgrammesCopy = [...culturalProgrammes];
		culturalProgrammesCopy.sort((culturalProgrammeA, culturalProgrammeB) => {
			if (sorted.reversed) {
				return culturalProgrammeB.titlee.localeCompare(culturalProgrammeA.titlee);
			}
			return culturalProgrammeA.titlee.localeCompare(culturalProgrammeB.titlee);
		});
		setCulturalProgrammes(culturalProgrammesCopy);
		setSorted({ sorted: "titlee", reversed: !sorted.reversed });
	};

	const search = (event) => {
		const matchedCulturalProgrammes = data.filter((culturalProgramme) => {
			return culturalProgramme.titlee
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});

		setCulturalProgrammes(matchedCulturalProgrammes);
		setSearchPhrase(event.target.value);
	};


	const renderCulturalProgrammes = () => {
		return culturalProgrammes.map((culturalProgramme) => {
			return (
				<tr>
					<td>{culturalProgramme.id}</td>
					<td>{culturalProgramme.titlee}</td>
					<td>{culturalProgramme.venueid}</td>
					<td>{culturalProgramme.predatee}</td>
					<td>{culturalProgramme.progtimee}</td>
					<td>{culturalProgramme.desce}</td>
					<td>{culturalProgramme.presenterorge}</td>
					<td>{culturalProgramme.pricee}</td>
				</tr>
			);
		});
	};

	const renderArrow = () => {
		if (sorted.reversed) {
			return <FaArrowUp />;
		}
		return <FaArrowDown />;
	};

	return (
		<div className="LocationList">
			<div className="search-container">
				<input type="text" placeholder="Search" value={searchPhrase} onChange={search}/>
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th onClick={sortById}>
								<span style={{ marginRight: 10 }}>id</span>
								{sorted.sorted === "id" ? renderArrow() : null}
							</th>
							<th onClick={sortByName}>
								<span style={{ marginRight: 10 }}>Title</span>
								{sorted.sorted === "titlee"
									? renderArrow()
									: null}
							</th>
							<th>
								<span>VenueId</span>
							</th>
							<th>
								<span>Date</span>
							</th>
							<th>
								<span>Time</span>
							</th>
							<th>
								<span>Description</span>
							</th>
							<th>
								<span>Presenter</span>
							</th>
							<th>
								<span>Price</span>
							</th>
						</tr>
					</thead>
					<tbody>{renderCulturalProgrammes()}</tbody>
				</table>
			</div>
		</div>
	);
}

export default LocationList;
