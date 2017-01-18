// get elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

let mouseDownOnSlider = false;
let mouseDownOnProgress = false;

// functions
function togglePlay(){
	if(video.paused){ 
		video.play(); 
	}else{
		video.pause();
	}
}

function skip(){
	var amount = this.dataset.skip;
	video.currentTime += parseFloat(amount);
}

function handleSliderUpdate(){
	if(!mouseDownOnSlider) return;

	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	console.log(this);
	const scrubTime = (e.offsetX / this.offsetWidth) * video.duration;

	video.currentTime = scrubTime;
}

function requestFullscreen(){
	// We lose custom controls in fullscreen, so no need to handle toggling back, browser does that
	console.log(video);

	if (video.requestFullscreen) {
    	video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
    	video.mozRequestFullScreen();               
	} else if (video.webkitRequestFullscreen) {
    	video.webkitRequestFullscreen();
    }
}

// event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => toggle.textContent = '❚ ❚');
video.addEventListener('pause', () => toggle.textContent = '►');

video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(slider => slider.addEventListener('change', handleSliderUpdate));
ranges.forEach(slider => slider.addEventListener('mousemove', handleSliderUpdate));
ranges.forEach(slider => slider.addEventListener('mousedown', () => mouseDownOnSlider = true));
ranges.forEach(slider => slider.addEventListener('mouseup', () => mouseDownOnSlider = false));
ranges.forEach(slider => slider.addEventListener('mouseout', () => mouseDownOnSlider = false));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDownOnProgress && scrub.call(progress, e));
progress.addEventListener('mousedown', () => mouseDownOnProgress = true);
progress.addEventListener('mouseup', () => mouseDownOnProgress = false);
progress.addEventListener('mouseout', () => mouseDownOnProgress = false);

fullscreen.addEventListener('click', requestFullscreen);