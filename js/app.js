const myPromise = fetch('https://api.waqi.info/feed/here/?token=');

myPromise.then(data => data.json())
		.then(data => console.log(data))