const localization = document.querySelector('.localization');
const myPromise = fetch('https://api.waqi.info/feed/here/?token=');

function getCity(str) {

}

myPromise.then(data => data.json())
		.then(data => {
			return localization.textContent = data.data.city.name;
			console.log(data.data.city.name)
		})
		.catch(err => console.error(err));
