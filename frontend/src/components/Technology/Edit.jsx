import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormInput from "../FormInput";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function Edit() {
	let { id } = useParams();
	const [values, setValues] = useState([]);

	const getData = (id) => {
		axios
			.get(`http://localhost:4000/api/technology/${id}`)
			.then(function (res) {
				console.log(res.data);
				setValues(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	useEffect(() => {
		getData(id);
	}, [id]);

	const options = [
		{
			label: "TV",
			value: "tv",
		},
		{
			label: "Laptop",
			value: "laptop",
		},
	];

	const inputs = [
		// {
		// 	id: 1,
		// 	name: "type",
		// 	type: "select",
		// 	placeholder: "Type",
		// 	errorMessage:
		// 		"Type should be 3-16 characters and shouldn't include any special character!",
		// 	label: "type",
		// 	pattern: "^[A-Za-z0-9]{3,16}$",
		// 	required: true,
		// },
		{
			id: 2,
			name: "name",
			type: "text",
			placeholder: "name",
			errorMessage: "It should be a valid name!",
			label: "Name",
			required: true,
		},
		{
			id: 3,
			name: "made_date",
			type: "date",
			placeholder: "Made date",
			label: "Made",
		},
		{
			id: 4,
			name: "price",
			type: "number",
			placeholder: "price",
			errorMessage: "Price should be number",
			label: "price",
			required: true,
		},
		{
			id: 5,
			name: "model",
			type: "text",
			placeholder: "Model",
			errorMessage: "Please fill the field",
			label: "Model",
			required: true,
		},
		{
			id: 6,
			name: "company_id",
			type: "number",
			placeholder: "Company_id",
			errorMessage: "Please fill the field",
			label: "Company_id",
			required: true,
		},
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.patch(`http://localhost:4000/api/technology/${id}`, values)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				if (error) setShow(true);
			});
	};

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSelect = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	return (
		<div className="app">
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body>Error</Modal.Body>
			</Modal>
			<form onSubmit={handleSubmit}>
				<h1>Update Technology</h1>
				<div className="formInput">
					<label>Type</label>
					<select
						name="type"
						value={values["type"]}
						onSelect={onSelect}
						onChange={onChange}
					>
						{options.map((option) => (
							<option value={option.value}>{option.label}</option>
						))}
					</select>
					<span>Select a options</span>
				</div>
				{inputs.map((input) => (
					<FormInput
						key={input.id}
						{...input}
						value={values[input.name]}
						onChange={onChange}
					/>
				))}
				<button>Submit</button>
				<button>
					<Link to="/list" className="btn text-white  btn-warning">
						See Table
					</Link>
				</button>
			</form>
		</div>
	);
}
