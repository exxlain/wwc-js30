const player = document.querySelector('.player');
const fullScreenButton = document.getElementById('1');
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const onToggleClick = ()=>{
    video.paused ? video.play() : video.pause()
}

const updateButton = ()=>{
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}


const handleSkip = (e) =>{
    video.currentTime += parseFloat(e.target.dataset.skip)
}


const handleRangeChange =(e)=>{
  video[e.target.name] = e.target.value
}

const handleProgress =()=>{
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

const changeProgressBar =(e)=>{
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

const goFullScreen =()=>{
    video.requestFullscreen()
}

toggle.addEventListener('click', onToggleClick)
video.addEventListener('click', onToggleClick)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress);


skipButtons.forEach(skip=>skip.addEventListener('click', (e)=>handleSkip(e)))
ranges.forEach(range=>range.addEventListener('change', (e)=>handleRangeChange(e)))


progress.addEventListener('click', (e)=>changeProgressBar(e))
let mousedown = false;
progress.addEventListener('click', (e)=>changeProgressBar(e));
progress.addEventListener('mousemove', (e) => mousedown && changeProgressBar(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreenButton.addEventListener('click', () => goFullScreen());
