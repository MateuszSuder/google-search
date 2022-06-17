import google from 'googlethis';

type SearchOptionsInput = {page?: number, safe?: boolean, ris?: boolean} & { additional_params?: { [key: string]: any } };

const TO_SEARCH = 'London newborn photographer' as const;
const TO_FIND = 'ammazur' as const;
const HLS = ['en-GB', 'pl-PL'] as const;


(async () => {
	let pageFound = -1;
	let searchResult;
	let page = 0;
	while (pageFound === -1) {
		searchResult = null;
		const options: SearchOptionsInput = {
			page,
			safe: false,
			additional_params: {
				hl: 'en-gb'
			}
		};

		try {
			const res = await google.search(TO_SEARCH, options);
			searchResult = res.results.filter(result => result.url.includes(TO_FIND));
			if (searchResult.length) {
				pageFound = page;
				if (options.additional_params && "hl" in options.additional_params)
					console.log(`Found ${TO_FIND} with query ${TO_SEARCH} on page ${pageFound} for country ${options.additional_params['hl']}`);
				else
					console.log(`Found ${TO_FIND} with query ${TO_SEARCH} on page ${pageFound}`);
				break;
			} else {
				if (res.results.length === 0) {
					if (options.additional_params && "hl" in options.additional_params) {
						console.log(`No results for ${TO_FIND} with query ${TO_SEARCH} for country ${options.additional_params['hl']}`);
					} else {
						console.log(`No results for ${TO_FIND} with query ${TO_SEARCH}`);
					}
					break;
				}

			}
			page++;
		} catch(e: any) {
			if(e.info?.message?.includes('429')) {
				console.error(e.info);
				await new Promise(r => setTimeout(r, 10000));
			}
		}

	}
})()
