const localization = document.querySelector('.localization');
const pm10Info = document.querySelector('.pm10-result');
const pm25Info = document.querySelector('.pm25-result');
const o3Info = document.querySelector('.o3-result');
const myPromise = fetch('https://api.waqi.info/feed/here/?token=bec1f2834d0747c3fad4a5968e913404e4b1d0df');
const results = document.querySelectorAll('.result')

function airQualityPm25(num) {
	let pm25Level = '';
	if (num <= 10) {
		pm25Level = 'good';
	} else if (num > 10 && num <= 20) {
		pm25Level = 'fair';
	} else if (num > 20 && num <= 25) {
		pm25Level = 'moderate';
	} else if (num > 25 && num <= 50) {
		pm25Level = 'poor';
	} else if (num > 50 && num <= 800) {
		pm25Level = 'very poor';
	}
	return pm25Level;
}

function airQualityPm10(num) {
	let pm10Level = '';
	if (num <= 20) {
		pm10Level = 'good';
	} else if (num > 20 && num <= 35) {
		pm10Level = 'fair';
	} else if (num > 35 && num <= 50) {
		pm10Level = 'moderate';
	} else if (num > 50 && num <= 100) {
		pm10Level = 'poor';
	} else if (num > 100 && num <= 1200) {
		pm10Level = 'very poor';
	}
	return pm10Level;
}


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
