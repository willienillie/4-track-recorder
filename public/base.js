$(function(){
    var stopClass = "btn-danger";
    var playClass = "btn-success";
    //set up new session on server with
    //id for saving audio
    if(FourTracker.ok()){
        $("#record").click(function(){
            var btn = $(this);
            if(btn.hasClass(stopClass)){
                btn.toggleClass(stopClass).find("span").text("Record ");
                FourTracker.stopRecord();
            }else{
                FourTracker.startRecord();
                btn.toggleClass(stopClass).find("span").text("Stop ");
            }
        });
        $("#play").click(function(){
            var btn = $(this);
            if(btn.hasClass(playClass)){
                btn.toggleClass(playClass).find("span").text("Play ");
                FourTracker.stopPlay();
            }else{
                FourTracker.startPlay();
                btn.toggleClass(playClass).find("span").text("Stop ");
            }
        });
    }else{
        alert("You ain't got no getUserMedia!");
        document.write("<h1>ain't nobody got time fo dat</h1><img src='http://i0.kym-cdn.com/photos/images/newsfeed/000/284/529/e65.gif'></img>");
    }
});
