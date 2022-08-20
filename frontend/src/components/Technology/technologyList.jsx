import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default function TechnologyList() {
	const [technologies, setTechnologies] = useState([]);

	const getData = () => {
		axios
			.get("http://localhost:4000/api/technology")
			.then(function (res) {
				setTechnologies(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const deleteData = (id) => {
		axios
			.delete(`http://localhost:4000/api/technology/${id}`)
			.then(function (res) {
				console.log(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	function TableBody(technologies) {
		return technologies.map((tech) => (
			<tr>
				<th scope="row">{tech.id}</th>
				<td>{tech.type}</td>
				<td>{tech.name}</td>
				<td>{tech.made_date}</td>
				<td>{tech.model}</td>
				<td>{tech.price}</td>
				<td>
					<button>
						<Link
							className="btn btn-primary btn-outline"
							to={`/edit/${tech.id}`}
						>
							Edit
						</Link>
					</button>
				</td>
				<td>
					<button
						onClick={() => deleteData(tech.id)}
						className="btn btn-danger"
					>
						Delete
					</button>
				</td>
			</tr>
		));
	}

	useEffect(() => {
		getData();
	}, [technologies]);

	return (
		<div className="background-secondary">
			<Table striped bordered hover>
				<thead>
					<tr className="p-2">
						<th scope="col">#</th>
						<th scope="col">Type</th>
						<th scope="col">Name</th>
						<th scope="col">Made</th>
						<th scope="col">Model</th>
						<th scope="col">Price</th>
						<th scope="col">Edit</th>
					</tr>
				</thead>
				<tbody>{TableBody(technologies)}</tbody>
			</Table>
		</div>
	);
}
