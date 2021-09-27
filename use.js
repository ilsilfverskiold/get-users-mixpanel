const getArray = require('./get.js');

async function getData() {
	return await getArray.fetchJSON();
}

async function useData() {
	
	const fetchedData = await getData();
  console.log(fetchedData);
  
}
