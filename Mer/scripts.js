"use strict";

async function request(url, options){
  const response = await fetch(url, options);
  const status = await response.status;
  if(response){
    return response;
  }
  else{
    throw new Error(response);
  }
}

async function logIn(){
  document.getElementById("login").setAttribute("disabled", "disabled");
  document.getElementById("password").setAttribute("disabled", "disabled");
  document.getElementById("login_button").setAttribute("disabled", "disabled");

  var login = document.getElementById("login").value;
  var password = document.getElementById("password").value;
  var url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';

  try{
    const response = await request(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: login, password: password})

    })

    if(response.status == 200){
      var user = await response.json();
      document.location="profile.html?name="+user.name+"&photoUrl="+user.photoUrl;
    }
    if(response.status == 0) {
      document.getElementById("errortext").textContent="No internet connection";
      document.getElementById("error").style="display: inline-block;";
    }
    if(response.status == 503) {
      document.getElementById("errortext").textContent="Server is temporarily unavailable";
      document.getElementById("error").style="display: inline-block;";
    }
    if(response.status == 400) {
      document.getElementById("errortext").textContent="E-Mail or password is incorrect";
      document.getElementById("error").style="display: inline-block;";
      document.getElementById("login").classList.add("error");
      document.getElementById("password").value = "";
    }

  } catch(e){
    document.getElementById("errortext").textContent="Some kind of mistake";
    document.getElementById("error").style="display: inline-block;";

  }

  document.getElementById("login").removeAttribute("disabled");
  document.getElementById("password").removeAttribute("disabled");
  document.getElementById("login_button").removeAttribute("disabled");

}

function OnLoad() {
  var paramValue = window.location.href.split("?")[1].split("=")[1];

  var name = getUrlVars()["name"];
  var photoUrl = getUrlVars()["photoUrl"];

  document.getElementById("UsName").innerHTML = decodeURIComponent(name);
  document.getElementById("photo").src = decodeURIComponent(photoUrl);

}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function remove() {
  document.getElementById("login").classList.remove("error");
}
