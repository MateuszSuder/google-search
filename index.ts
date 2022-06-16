import google from 'googlethis';

const TO_SEARCH = 'Newborn photoshoot london';

const options = {

};


(async () => {
	const res = await google.search(TO_SEARCH, options);
	console.log(res);
})()
