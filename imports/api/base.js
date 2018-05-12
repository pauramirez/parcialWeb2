import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';


export const Buses = new Mongo.Collection("buses");


//metodos para quitar el autopublish

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('buses', function postsPublication() {
    return Tweets.find();
  });
}

const nestedBuses = d3.nest().key((d) => d.routeTag).entries(data.vehicle)
const maxNumBuses = d3.max(nestedBuses.map((d) => d.values.length))
const stackedBuses = d3.stack().keys(keys).value((d, key) => {
                return key < d.values.length ? d.values[key].distance : 0;
        })(nestedBuses)

const rows = [];
const keys = d3.range(maxNumBuses)

Meteor.methods({

    graph(d, key){
      stackedBuses = d3.stack()
        .keys(keys)
        .value((d, key) => {
          return key < d.values.length ? d.values[key].distance : 0;
        })(nestedBuses)
    }

    searchRoutes(lat1,lon1,lat2,lon2){  
        
        deg2rad(deg) {
            return deg * (Math.PI/180);
        }

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

    //key is date
    searchBus(){ for (let route of nestedBuses ) {
      route.total = 0;
      route.values[0].distance = 0;
      for (let i = 1 ; i < route.values.length; i++) {
        route.values[i].distance = getDistance(+route.values[i-1].lat, +route.values[i-1].lon,
          +route.values[i].lat, +route.values[i].lon);
        route.total += route.values[i].distance;
      }
    }
    return nestedBuses.sort(function(a, b) { return b.total - a.total; });
    }
}
)