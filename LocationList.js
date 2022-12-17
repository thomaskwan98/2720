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
