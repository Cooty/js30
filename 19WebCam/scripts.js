const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// https://stackoverflow.com/questions/30047056/is-it-possible-to-check-if-the-user-has-a-camera-and-microphone-and-if-the-permi

function getVideo() {
    console.log(navigator.mediaDevices);
    navigator.mediaDevices.enumerateDevices().then(result =>{
        console.log(result);
    });

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(err => {
            console.error('Error with webcam stream', err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return window.setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // get the pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        // manipulate the pixels
        //pixels = redEffect(pixels);
        pixels = rgbShift(pixels);
        ctx.globalAlpha = 0.1; // ghost effect
        // put the pixels back to the drawing context
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'ez-itt-a-kert');
    link.innerHTML = `<img src="${data}" alt="ez-itt-a-kert">`;
    strip.insertBefore(link, strip.firstChild); // jQuery.prepend()
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100 // r
        pixels.data[i + 1] = pixels.data[i + 1] - 50 // g
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // b
    }

    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0] // r
        pixels.data[i + 100] = pixels.data[i + 1] // g
        pixels.data[i - 150] = pixels.data[i + 2] // b
    }

    return pixels;
}

function greenScreen(pixels) {
    for(let i = 0; pixels.data.length; i += 4) {
        
    }
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
