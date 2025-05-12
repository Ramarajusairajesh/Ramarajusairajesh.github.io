
function preloadImage(src, callback) {
	const img = new Image();
	img.src = src;
	img.onload = callback;
}

function loadAllBackgrounds() {
	document.querySelectorAll('.section').forEach(section => {
		const bgDiv = section.querySelector('.bg-image');
		const imgName = section.getAttribute('data-bg');
		const imgUrl = `assets/${imgName}`;

		preloadImage(imgUrl, () => {
			bgDiv.style.backgroundImage = `url('${imgUrl}')`;
			bgDiv.classList.add('bg-loaded');
		});
	});
}

// Scroll-triggered animation only (no image change)
function handleScroll() {
	document.querySelectorAll('.section').forEach(section => {
		const rect = section.getBoundingClientRect();
		const text = section.querySelector('.text-container');

		if (rect.top < window.innerHeight && rect.bottom > 0) {
			text.style.animation = 'none';
			void text.offsetWidth;
			text.style.animation = 'dropIn 1.5s forwards';
		} else {
			text.style.animation = 'none';
			text.style.top = '-50px';
			text.style.opacity = '0';
		}
	});
}

function setupNavigation() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			if (targetId !== '#') {
				document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	document.querySelectorAll('.scroll-indicator').forEach(indicator => {
		indicator.addEventListener('click', function () {
			const next = this.parentElement.nextElementSibling;
			if (next) next.scrollIntoView({ behavior: 'smooth' });
		});
	});
}

window.addEventListener('load', () => {
	loadAllBackgrounds();
	handleScroll();
	setupNavigation();
});

window.addEventListener('scroll', handleScroll);

