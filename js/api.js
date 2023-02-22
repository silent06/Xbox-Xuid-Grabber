
document.getElementById("btnXbox").addEventListener("click", function () {
    var $tag = document.getElementById("tag").value;
    xhr = new XMLHttpRequest();
    const reqUrl = "https://node.silentlive.gq:8443/api?id=\"" + $tag + "\"";
    console.log("reqUrl: ", reqUrl); 
    var message = null;

        
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) { // xhr.status === 200 

            xhr.onload = (res) => {
                var Xuid = document.getElementById('Xuid');
                var Gamertag = document.getElementById('Gamertag');
                var GamerScore = document.getElementById('GamerScore');
                var xboxOneRep = document.getElementById('xboxOneRep');
                message = res['target']['response']; 
                
                var data = JSON.parse(message);

                if(data === null) {

                    $('.main_Gif').hide()
                    Xuid.innerHTML = "Failed To Find Profile :*(";
                    return;
                }
                console.log("Recieved:", data );  

                Xuid.innerHTML = "XUID: " + data.xuid;
                Gamertag.innerHTML = "Gamertag: " + data.Gamertag;
                GamerScore.innerHTML = "GamerScore: " + data.GamerScore;
                xboxOneRep.innerHTML = "xboxOneRep: " + data.xboxOneRep;

                /*Image*/
                var img = document.createElement("img");                              
                /*Set width and height*/
                img.width = 350;
                img.height = 350;
                img.src = data.AvatarPic;
                document.getElementById("imgPic").appendChild(img);
                $('.main_Gif').hide();
                
            };
        } else if(!xhr.readyState === 4 && xhr.status === 200) {

            var Xuid = document.getElementById('Xuid');
            $('.main_Gif').hide()
            Xuid.innerHTML = "Failed To Find Profile :*(";
        }

    };
    xhr.open("GET", reqUrl, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin","https://silentlive.gq");
    xhr.setRequestHeader("Accept","application/json");
    xhr.send();
});















