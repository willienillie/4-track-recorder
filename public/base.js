$(function(){
    var stopClass = "btn-danger";
    var playClass = "btn-success";
    //set up new session on server with
    //id for saving audio
    if(FourTracker.ok()){
        $("#record").click(toggleRec);
        $("#play").click(togglePlay);
        $(".track-rec").click(toggleRecTrack);
        $(".track-play").click(togglePlayTrack);
        $(".track-volume").change($.throttle(100,setTrackVolume));
        $("#save").click(downloadAudio);
    }else{
        alert("You ain't got no getUserMedia!");
        document.write("<h1>ain't nobody got time fo dat</h1><img src='http://i0.kym-cdn.com/photos/images/newsfeed/000/284/529/e65.gif'></img>");
    }

    //jquery click callbacks
    function togglePlay(){
        togglePlayButton();
        FourTracker.togglePlay();
    }
    function toggleRec(){
        togglePlayButton();
        var btn = $("#record");
        if(btn.hasClass(stopClass)){
            btn.toggleClass(stopClass).find("span").text(" Record");
            FourTracker.stopRecord();
            FourTracker.stopPlay();
        }else{
            btn.toggleClass(stopClass).find("span").text(" Stop");
            //stop play incase we hit play then record to start over
            FourTracker.stopPlay();
            FourTracker.startRecord();
            FourTracker.startPlay();
        }
    }
    function toggleRecTrack(){
        var btn = $(this);
        $(".track-rec").removeClass('btn-danger').html(
            "<i class='icon-minus'></i>"
        );
        btn.addClass("btn-danger")
            .html('<i class="icon-bullhorn icon-white"></i>');
        FourTracker.setRecordTrack(btn.data('tracknumber'));
    }
    function togglePlayTrack(){
        var btn = $(this);
        btn.toggleClass('btn-success');
        FourTracker.toggleMuteTrack(btn.data('tracknumber'));
    }
    function setTrackVolume(){
        var slider = $(this);
        FourTracker.setTrackVolume(slider.data('tracknumber'),slider.val());
    }
    function togglePlayButton(){
        var btn = $("#play");
        if(btn.hasClass(playClass)){
            btn.toggleClass(playClass).find("span").text(" Play");
        }else{
            btn.toggleClass(playClass).find("span").text(" Stop");
        }
        btn.find('i').toggleClass('icon-play').toggleClass('icon-stop');
    }

    function downloadAudio(){
        FourTracker.getRawAudio(function(blob){
            var audioHref = (window.URL || window.webkitURL).createObjectURL(blob)
            var downloadLink = document.createElement('a');
            downloadLink.href = audioHref;
            downloadLink.download = "track.wav";
            var click = document.createEvent('Event');
            click.initEvent("click",true,true);
            downloadLink.dispatchEvent(click);
           
            
        });
    }
});
