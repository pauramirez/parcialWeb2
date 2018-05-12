import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Grafica from "./Grafica";


export default class BussInfo extends Component{

  constructor(props) {
    super(props);

      this.state={

      };
    }

    nestedBuses = d3.nest().key((d) => d.routeTag).entries(data.vehicle)
    maxNumBuses = d3.max(nestedBuses.map((d) => d.values.length))
    stackedBuses = d3.stack().keys(keys).value((d, key) => {
                return key < d.values.length ? d.values[key].distance : 0;
        })(nestedBuses)

    rows = [];
    keys = d3.range(maxNumBuses);

    graph(d, key){
      stackedBuses = d3.stack()
        .keys(keys)
        .value((d, key) => {
          return key < d.values.length ? d.values[key].distance : 0;
        })(nestedBuses)
    }

    deg2rad(deg) {
            return deg * (Math.PI/180);
        }

    searchRoutes(lat1,lon1,lat2,lon2){  

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

    render() {
      return (
        <div>
            <br />
            <LineChart width={600} height={300} data={rows}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="#8884d8" dot={false} />
                <Line type="monotone" dataKey="high" stroke="#82ca9d" dot={false} />
                <Line type="monotone" dataKey="low" stroke="#B4045F" dot={false} />
                <Line type="monotone" dataKey="close" stroke="#868A08" dot={false} />
            </LineChart>
        </div>
      )
    }
}