import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";

const App = () => {
	const [values, setValues] = useState({
		type: "",
		name: "",
		made_date: "",
		model: "",
		price: "",
		company_id: "",
	});

	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

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
		console.log("ishladi");
		axios
			.post("http://localhost:4000/api/technology/add", values)
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

	return (
		<div>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body>Error</Modal.Body>
			</Modal>
			<div className="app">
				<form onSubmit={handleSubmit}>
					<h1>Technology</h1>
					<div className="formInput">
						<label>Type</label>
						<select
							name="type"
							defaultValue="tv"
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
		</div>
	);
};

export default App;
