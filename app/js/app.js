const settings = {
	localization: document.querySelector('.localization'),
	pm10Info: document.querySelector('.pm10-result'),
	pm25Info: document.querySelector('.pm25-result'),
	myPromise: fetch('https://api.waqi.info/feed/krakow/?token=bec1f2834d0747c3fad4a5968e913404e4b1d0df'),
	results: document.querySelectorAll('.result'),
	answerBox: document.querySelector('p.answer'),
	airDesc: document.querySelector('.air-desc'),
	advice: document.querySelector('.advice'),
	image: document.querySelector('img')
}



function airQualityPm25(num) {
	if (num <= 20) {
		return true;
	} else {
		return false;
	}
}

function airQualityPm10(num) {
	if (num <= 35) {
		return true;
	} else {
		return false;
	}
}

function generalAirQuality(pm10, pm25) {
	if (pm10 && pm25) {
		settings.answerBox.textContent = 'NO';
		settings.airDesc.textContent = 'good';
		settings.advice.textContent = 'can go outside, open the window and enjoy your day';
		settings.image.setAttribute('src', 'img/good.svg');
	} else {
		settings.answerBox.textContent = 'YES';
		settings.airDesc.textContent = 'bad';
		settings.advice.textContent = 'should rather stay at home, at least for now';
		settings.image.setAttribute('src', 'img/bad.svg');
	}
}

settings.myPromise.then(response => response.json())
		.then(response => {
			const city = response.data.city.name
			settings.localization.textContent = city.split("-")[0];
		
			settings.results.forEach(result => {
				const info = result.dataset.name;
				const infoValue = response.data.iaqi[info];
				result.textContent = infoValue.v;
			})
			
			let pm10Info = airQualityPm10(response.data.iaqi.pm10.v);
			let pm25Info = airQualityPm25(response.data.iaqi.pm25.v);
			generalAirQuality(pm10Info, pm25Info);
		})
		.catch(err => console.error(err));
