(function(window){
    //15 second track limit which is about 2.5mb
    var audioContext = null,
        recorder = null,
        recorderSource = null,
        input, 
        microphone,
        track,
        sink;

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
        recorder.clear();
        recorder.record();
    };

    FourTracker.prototype.stopRecord = function(){
        //eventually choose correct track to stop recording
        recorder.stop();
    };

    FourTracker.prototype.startPlay = function(){
        recorder.getBuffer(playback);
    };

    FourTracker.prototype.stopPlay = function(){
        playbackSource.stop(0);
    };

    FourTracker.prototype.ok = function(){
        return canRecord();
    };

    FourTracker.prototype.getRawAudio = function(){
        return audioStream;
    };

    function failToGetMedia(e){
        console.log("Problem getting audio: ", e);
    } 
    
    function startStream(audioStreamIn){
        input = audioContext.createGainNode();

        microphone = audioContext.createMediaStreamSource(audioStreamIn);
        microphone.connect(input);
        recorder = new Recorder(input, {workerPath: '/js/recorder/recorderWorker.js'});
    }
    function playback(buffers){
        playbackSource = audioContext.createBufferSource();
        var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
        newBuffer.getChannelData(0).set(buffers[0]);
        newBuffer.getChannelData(1).set(buffers[1]);
        playbackSource.buffer = newBuffer;

        playbackSource.connect( audioContext.destination );
        playbackSource.start(0);     
    };

    window.FourTracker = new FourTracker();
})(window);
