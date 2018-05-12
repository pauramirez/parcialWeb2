import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import NavBar from "./NavBar";
import BussInfo from "./BussInfo";
import Form from "./Form";
import Grafica from "./Grafica";

//import Filter from "./Filter";

import AccountsUIWrapper from './AccountsUIWrapper';

export class App extends Component {

	constructor(props) {
    super(props);
  	}

  	isUserAdmin(){
    	console.log(Meteor.user().username);
    	if (Meteor.user().username == "pauramirez" || Meteor.user().roll == "full") {
      		return true;
    	}
    	else return false;
  	}

  	isUserActive(){
    	console.log(Meteor.user().username);
    	if (Meteor.user().username == null || Meteor.user().username == undefined || Meteor.user().username == "") {
      		return false;
    	}
    	else return true;
  	}

    deg2rad(deg) {
      return deg * (Math.PI/180);
    }

  	searchRoutes(lat1,lon1,lat2,lon2) {

        R = 6371; // Radius of the earth in km
        dLat = deg2rad(lat2-lat1);  // deg2rad below
        dLon = deg2rad(lon2-lon1);
        a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        d = R * c; // Distance in km
      return d;

  	}

    

  	render(){
  		return (
  			<div className="App">
  				<NavBar/>
  				<hr/>
  				<div className ="row">
  				<br/>
  					<div className ="col-sm-6">
  						<h4>San francisco buses</h4>
        				
        				<input
          					className="Lat1"
          					type="text"
          					placeholder="From 37.7 to 37.8"
          					ref="text">Lat 1:</input>
                <input
                    className="Long1"
                    type="text"
                    placeholder="From -122.49 to -122.41"
                    ref="text">Long 1:</input>
                <input
                    className="Lat2"
                    type="text"
                    placeholder="From 37.7 to 37.8"
                    ref="text">Lat 1:</input>
                <input
                    className="Long2"
                    type="text"
                    placeholder="From -122.49 to -122.41"
                    ref="text">Long 1:</input>
        				<button
          					onClick={ () =>
              				this.props.searchRoutes(this.Lat1.text.value, this.Long1.text.value, this.Lat2.text.value, this.Long2.text.value)
          					}
        				>Find
        				</button>
  					</div>
              
  					<div className ="col-sm-6">
              <form/>
  					</div>
  				</div>
  				<div className ="row">
  					<Grafica/>
  				</div>
  			</div>
  		)
  	}

}

App.propTypes = {
  //posts: PropTypes.array.isRequired
};
//conexión mongo 
export default withTracker(
  () => {
    Meteor.subscribe('base');
    return {
      //lo limite al top 10 mas votadas
      //posts: Posts.find({"text" : {$regex : titulo}}, {limit: 15,sort: {voteCount:-1}}).fetch()
    };
  }
)(App);
