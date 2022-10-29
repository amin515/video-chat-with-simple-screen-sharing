// get elemnts

const screen_1 = document.getElementById('screen1');
const screen_2 = document.getElementById('screen2');

const camBtn = document.getElementById('cambtn');
const camAudioBtn = document.getElementById('camAudioBtn');


const smallvideo = document.querySelector('.screen-02')

const shareScreenBtn = document.getElementById('shareScreenBtn');





// variable streem

let camStream  ;
let screenStrem ;
let peerConnection ;
// make webRTC connection
let servers = {
    iceServers : [
       {
           "urls" : ["stun:stun.l.google.com:19302",
               "stun:stun1.l.google.com:19302",
               "stun:stun2.l.google.com:19302"]
       }
    ]
}

// share camera
const camShare = () => {
    navigator.mediaDevices.getUserMedia({
        video : true,
        audio : true
    })
    .then( stream => {
        camStream = stream;
        screen_1.srcObject = stream;

        peerConnection = new RTCPeerConnection(servers)

        peerConnection.addStream(camStream)


    })
}


// share pc screen
const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({
        video : true,
        audio : true
    })
    .then( stream => {
        screenStrem = stream;
        screen_1.srcObject = stream;
        screen_2.srcObject = camStream;
    })
    
}

camShare()


// toggle camera button
let camVideoToggle = true;
camBtn.onclick = () => {
    camVideoToggle = !camVideoToggle;
    camStream.getVideoTracks()[0].enabled = camVideoToggle;
    camBtn.classList.toggle('active');
}





// toggle audio button
let camAudioToggle = true;
camAudioBtn.onclick = () => {
    camAudioToggle = !camAudioToggle;
    camStream.getAudioTracks()[0].enabled = camAudioToggle;
    camAudioBtn.classList.toggle('active');
}



// function for call screen shares

let screenStatus = false;
shareScreenBtn.onclick = () => {
   screenStatus = !screenStatus;
    if(screenStatus){
        shareScreen();
        smallvideo.style.display = 'block';
    }else{
        smallvideo.style.display = 'none';
        screenStrem.getVideoTracks()[0].enabled = screenStatus;
        screen_1.srcObject = camStream;

    }
 
    shareScreenBtn.classList.toggle('active');
}