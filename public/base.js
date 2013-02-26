$(function(){
    var stopClass = "btn-danger";
    var playClass = "btn-success";
    //set up new session on server with
    //id for saving audio
    if(FourTracker.ok()){
        $("#record").click(function(){
            var btn = $(this);
            if(btn.hasClass(stopClass)){
                btn.toggleClass(stopClass).find("span").text(" Record");
                FourTracker.stopRecord();
            }else{
                FourTracker.startRecord();
                btn.toggleClass(stopClass).find("span").text(" Stop");
            }
        });
        $("#play").click(function(){
            var btn = $(this);
            if(btn.hasClass(playClass)){
                btn.toggleClass(playClass).find("span").text(" Play");
                FourTracker.stopPlay();
            }else{
                FourTracker.startPlay();
                btn.toggleClass(playClass).find("span").text(" Stop");
            }
            btn.find('i').toggleClass('icon-play').toggleClass('icon-stop');
        });
        $(".track-rec").click(toggleRecTrack);
        $(".track-play").click(togglePlayTrack);
    }else{
        alert("You ain't got no getUserMedia!");
        document.write("<h1>ain't nobody got time fo dat</h1><img src='http://i0.kym-cdn.com/photos/images/newsfeed/000/284/529/e65.gif'></img>");
    }

    //jquery click callbacks
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
});
