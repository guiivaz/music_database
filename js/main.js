
var URL_BASE = "http://localhost:3000";
var songs = [];

window.onload = function(){
    if(!localStorage.userID){
        window.location = "index.html";
    }else{
        document.getElementById('username_logout').innerHTML = localStorage.username
        readSongs();
    }   
    }
//LOGOUT
function logout(){
    localStorage.removeItem('userID')
    window.location = "index.html"
}  
function Enter(){
var input = document.getElementById("inputArtist");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("addSong").click();
  }
})
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//CREATE
function sendSong(){
    event.preventDefault();
    
    let song = {
        title: document.getElementById("inputTitle").value,
        artist: document.getElementById("inputArtist").value,
        user: localStorage.userID
    }
    let url = URL_BASE +"/song";

    callAPI(url, "POST", function(response){
        readSongs();
    }, song);
}

//READ ALL
function readSongs(){
    let url = URL_BASE +"/song/user/"+ localStorage.userID;
    sleep(1000);
    callAPI(url, 'GET', function(response){
        var src ="";
        for(var i=0; i<response.length; i++){
            var title = response[i].id + 'title';
            var artist = response[i].id + 'artist';
            src += "<div id="+response[i].id+"><img src='componente.png'><p id="+title+" contenteditable='true' spellcheck='false' class='title'>"+response[i].title+"</p><p id="+artist+" contenteditable='true' spellcheck='false'>"+response[i].artist+"</p><section class='buttons'><button class='deleteSong' onclick= deleteSong('"+response[i].id+"')>x</button><button class='updateSong' onclick=updateSong('"+response[i].id+"') >↻</button></section></div>";
        }
        document.getElementById("inputTitle").value = ""
        document.getElementById("inputArtist").value = ""
        document.getElementById('content').innerHTML = src;
        this.songs = response;
    })
}
//UPDATE
function updateSong(id){
    event.preventDefault();

    let song = {
        _id: id,
        title: document.getElementById(id+'title').innerText,
        artist: document.getElementById(id+'artist').innerText,
        user: localStorage.userID
    }
    console.log(document.getElementById(id+'title').innerText)
    let url = URL_BASE + "/song";
    callAPI(url, "PATCH", function(response){
        readSongs()
    }, song );
    /* CASO NÃO ATUALIZE NA HORA, DAR F5 */
}
//DELETE
function deleteSong(id){
    event.preventDefault();
    let url = URL_BASE + "/song/" + id

    callAPI(url, 'DELETE', function(response){
        readSongs();
    })
}
