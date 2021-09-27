const fetch = require('node-fetch');
// Import api keys file
const keys = require('./keys.js');
	
const url = `https://eu.mixpanel.com/api/2.0/engage?project_id=${keys.project_id}&filter_by_cohort={"id":1492877}`;
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization:
      "Basic " +
      Buffer.from(
        keys.mixpanel_api_key + ":\\ ",
        "utf-8"
      ).toString("base64"),
  }
};

async function fetchJSON() {
  const res = await fetch(url, options);
  const results = await res.json()
  return await processData(results);
}

module.exports.fetchJSON = fetchJSON;

async function processData(json) {
	
	const data = await json,
	results = await data.results,
	amountOfResults = await data.total,
	status = await data.status;
	
	console.log(data);
	
	let dataArray = [];
	
	if(status == "ok") {
		for(let i = 0; i < amountOfResults - 1; i++) {
			dataArray.push([results[i].$distinct_id,results[i].$properties.first_name, results[i].$properties.$country_code]);
		}
	}
	return dataArray;
}
