function login(){
    event.preventDefault();
    let url= "http://localhost:3000/user/login";

    let user = {
        username: document.getElementById("inputUsername").value,
        password: document.getElementById("inputPassword").value,
        songs: []
    }

    console.log(user);

    callAPI(url, "POST", function(response){
        if (response == null){
            alert('Login inválido');
        }else{
            localStorage.userID = response;
            localStorage.username =  document.getElementById("inputUsername").value,
            window.location = "home.html";
        }
    }, user);
}
