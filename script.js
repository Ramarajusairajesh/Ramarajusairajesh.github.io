// Load background images
function loadBackgroundImages() {
	document.querySelectorAll('.section').forEach(section => {
		const bg = section.querySelector('.bg-image');
		const imgName = section.getAttribute('data-images');
		const imgUrl = `assets/${imgName}`;
		const img = new Image();
		img.src = imgUrl;

		img.onload = () => {
			bg.style.backgroundImage = `url('${imgUrl}')`;
			bg.classList.add('bg-loaded');
		};
	});
}

// Scroll-triggered animations
function handleScroll() {
	const sections = document.querySelectorAll('.section');
	sections.forEach(section => {
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

// Smooth scrolling for buttons and indicators
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

// On page load
window.addEventListener('load', () => {
	loadBackgroundImages();
	handleScroll();
	setupNavigation();
});

window.addEventListener('scroll', handleScroll);

