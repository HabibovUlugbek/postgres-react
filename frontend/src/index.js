import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TechnologyList from "./components/Technology/technologyList";
import Edit from "./components/Technology/Edit";

ReactDOM.render(
	<Router>
		<Switch>
			{/* <Route path="/about">
          <About />
        </Route> */}
			<Route exact path="/list">
				<TechnologyList />
			</Route>
			<Route exact path="/edit/:id">
				<Edit />
			</Route>
			<Route exact path="/">
				<App />
			</Route>
		</Switch>
	</Router>,
	document.getElementById("root")
);
