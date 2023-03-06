// api settings

const apiRequest = (realistikId = 34, bedrooms = 2) => {

	const api_url = `https://realtyrating.online/api/v1/apartments/?realist_id=${realistikId}&bedrooms=${bedrooms}`,
		api_options = {
			method: "POST",
			mode: 'cors',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin":"*"
			}
		};


	fetch(api_url, api_options)
		.then(data => {
			return data.json()
		})
		.then((json) => {
			console.log(json)
		})
		.catch((error) => {
			console.log(error)
		});
};


document.addEventListener('DOMContentLoaded', () => {
	console.log(apiRequest());
	
	// gallery slider settings
	const galleryElement = document.querySelector('.gallery');

	const gallerySlider = new Swiper('.gallery-slider', {
		autoHeight: true,
		slidesPerView: 1,
		speed: 500,
		loop: true,

		navigation: {
			nextEl: '.gallery-slider__button--next',
			prevEl: '.gallery-slider__button--prev'
		}
	});

	gallerySlider.on('slideChange', () => {
		galleryElement.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	});


	// chart settings

	Chart.defaults.font.size = 13;
	const chartLine = document.querySelector('.chart-line');

	new Chart(chartLine, {
		type: 'line',
		data: {
			labels: ['2021-03', '2021-04', '2021-05',
				'2022-06', '2022-07', '2022-11',
				'2023-03', '2023-07', '2023-11'
			],
			datasets: [{
					label: 'Price',
					data: [1500000, 2100000, 2500000, 2100000, 2600000, 2800000, 2450000, 2450000, 3600000],
					borderWidth: 2,
					borderDash: [5, 5],
					borderColor: '#0d61e1',
					spanGaps: true
				},
				{
					label: 'Fact',
					data: [1500000, 2500000, 2850000, 2400000, 2700000, 2720000],
					borderWidth: 2,
					borderColor: '#26732b',
					spanGaps: true
				}
			]
		},
		options: {
			locale: 'ru-RU',
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true
				}
			},
			interaction: {
				intersect: false
			},
			plugins: {
				legend: false
			}
		}
	});
});