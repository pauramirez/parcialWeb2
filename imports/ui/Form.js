import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

export default class Form extends Component {

	constructor(props) {
    super(props);

    	this.state={

    	};
  	}

  	render() {
    	return (
    		<div className = "Form">
    			<h5>Want an specific agency?</h5>
    			<input className="Lat2"
                    type="text"
                    placeholder="Example: sf-muni"
                    ref="text"/>
    		</div>
    		)
	}

}

PostAdd.propTypes = {
  //onAdd:PropTypes.func.isRequired
};