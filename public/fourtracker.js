(function(window){
    var Track = function(input){
        this.mute = false;
        this.empty = true;
        this.recorder = new Recorder(input, {workerPath: '/js/recorder/recorderWorker.js'});
        this.buffer = null;
        this.playback;
    }; 

    Track.prototype.save = function(buffers){
        var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
        newBuffer.getChannelData(0).set(buffers[0]);
        newBuffer.getChannelData(1).set(buffers[1]);
        this.buffer = newBuffer;
        this.empty = false;
    }

    Track.prototype.play = function(){
        this.playback = audioContext.createBufferSource();
        this.playback.buffer = this.buffer;
        this.playback.connect( audioContext.destination );
        this.playback.noteOn(0);     
    };

    Track.prototype.stop = function(){
        if(typeof this.playback === "undefined"){
            this.playback.noteOff(0);
        }
    };

    //15 second track limit which is about 2.5mb for a wav
    var audioContext = null,
        tracks = [],
        recorderSource = null,
        selectedTrack = null,
        four = 4;

    function canRecord() {
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    var FourTracker = function(){
        audioContext = new window.webkitAudioContext();
        navigator.webkitGetUserMedia({video: false, audio: true}, startStream, failToGetMedia); 
    };

    FourTracker.prototype.startRecord = function(){
        //eventually choose correct track to record
        selectedTrack.recorder.clear();
        selectedTrack.empty = true;
        selectedTrack.recorder.record();
    };

    FourTracker.prototype.stopRecord = function(){
        //eventually choose correct track to stop recording
        selectedTrack.recorder.stop();
        selectedTrack.recorder.getBuffer(function(buffers){
            selectedTrack.save(buffers);
        });
    };

    FourTracker.prototype.startPlay = function(){
        for(var i = 1; i <= four; i += 1){
            if(!tracks[i].empty && !tracks[i].mute){
                tracks[i].play();
            }
        }
    };

    FourTracker.prototype.stopPlay = function(){
        for(var i = 1; i <= four; i += 1){
            tracks[i].stop();
        }
    };

    FourTracker.prototype.ok = function(){
        return canRecord();
    };

    FourTracker.prototype.getRawAudio = function(){
        return audioStream;
    };

    FourTracker.prototype.setRecordTrack = function(number){
        console.log("track number set to: " + number);
        selectedTrack = tracks[number];
    };

    FourTracker.prototype.toggleMuteTrack = function(number){
        tracks[number].mute = !tracks[number].mute;
    };

    function failToGetMedia(e){
        console.log("Problem getting audio: ", e);
    } 
    
    function startStream(audioStreamIn){
        var input = audioContext.createGainNode();
        var microphone = audioContext.createMediaStreamSource(audioStreamIn);
        microphone.connect(input);
        for(var i = 1; i <= four; i += 1){
            tracks[i] = new Track(input);
        }
        selectedTrack = tracks[1];
    }

    window.FourTracker = new FourTracker();
})(window);
