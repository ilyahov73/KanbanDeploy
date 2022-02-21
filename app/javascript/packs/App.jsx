import React from 'react'
import { render } from "react-dom";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Home from '../components/Home'
import('styles/board_styles.css');

document.addEventListener("DOMContentLoaded", () => {
	render(<Home />, document.body.appendChild(document.createElement("div")));
});

//ReactDOM.render(<Counter_component/>, document.body.appendChild(document.createElement("div")));
//ReactDOM.render(<Board_component />, document.getElementById('app'));