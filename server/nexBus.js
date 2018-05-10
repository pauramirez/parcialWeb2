export const Buses = new Mongo.Collection("buses");
const request = require('superagent');

module.exports = (app) => {

    app.post('./buses', function (req, res, next) {
        //Assumin look up the user
        //Retrieve ticker symbols

        const tagSearch = 

        let completed = 0;
        const results = [];
        data = 'https://gist.githubusercontent.com/john-guerra/a0b840ba721ed771dd02d94a855cb595/raw/d68dba41f118bebc438a4f7ade9d27078efdfc09/sfBuses.json'
        nestedBuses = d3.nest().key((d) => d.routeTag).entries(data.vehicle)
        //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=UW88YO72CML3PNC9
        //http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList



        for (let i = 0; i < tickers.length; i++) {
            const ticker = tickers[i];
            request
                .get(data)
                .query({ tag: tagSearch })
                .then((response) => {
                    completed += 1;
                    //console.log('res', res.body['Meta Data']);
                    results.push(response.body);
                    if (completed == tickers.length) 
                    {
                        //all tckers are completed

                        console.log('completed');

                        res.send({
                            success: true,
                            message:'Routes',
                            results: results,
                        });
                    }

                });

        }

    });
};