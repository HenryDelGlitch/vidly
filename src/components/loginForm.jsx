import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	username = React.createRef();

	// componentDidMount() {
	// 	this.username.current.focus();
	// }

	validate = () => {
		const errors = {};

		const { account } = this.state;

		if (this.state.account.username.trim() === "")
			errors.username = "Username is required.";
		if (this.state.account.password.trim() === "")
			errors.password = "Password is required.";

		return Object.keys(errors).length === 0 ? null : errors;
	};

	//Stop the app from doing a full page reload
	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		// Call the server

		//Don't do the bottom when using React, you should make a reference and then use that
		//As when using React you don't want to interact with the real DOM
		//const username = document.getElementById("username").value;

		const username = this.username.current.value;

		console.log("");
	};

	validateProperty = ({ name, value }) => {
		if (name === "username") {
			if (value.trim === "") return "Username is required";
			// ...
		}
		if (name === "password") {
			if (value.trim === "") return "Password is required";
			// ...
		}
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);

		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const account = { ...this.state.account };
		account[input.name] = input.value;

		this.setState({ account, errors });
	};

	render() {
		const { account, errors } = this.state;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="username"
						value={account.username}
						label="Username"
						onChange={this.handleChange}
						error={errors.username}
					/>
					<Input
						name="password"
						value={account.password}
						label="Password"
						onChange={this.handleChange}
						error={errors.password}
					/>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
