import React from "react";
import { render } from "react-dom";
import Counter_component from "../components/index";

document.addEventListener("DOMContentLoaded", () => {
	render(<Counter_component />, document.body.appendChild(document.createElement("div")));
});