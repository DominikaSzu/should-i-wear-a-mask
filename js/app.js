const localization = document.querySelector('.localization');
const pm10Info = document.querySelector('.pm10-result');
const pm25Info = document.querySelector('.pm25-result');
const o3Info = document.querySelector('.o3-result');
const myPromise = fetch('https://api.waqi.info/feed/here/?token=bec1f2834d0747c3fad4a5968e913404e4b1d0df');
const results = document.querySelectorAll('.result')

myPromise.then(response => response.json())
		.then(response => {
			console.log(response)
			results.forEach(result => {
				const info = result.dataset.name;
				const infoValue = response.data.iaqi[info];
				result.textContent = infoValue.v;
			})
		})
		.catch(err => console.error(err));
