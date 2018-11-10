"use strict";

/* Данная функция создаёт кроссбраузерный объект XMLHTTP */
function getXmlHttp() {
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}



let p = new Promise((resolve, reject) => {
  // то же что reject(new Error("o_O"))
  resolve("It's Okay");
})





async function logIn(){
  document.getElementById("login").setAttribute("disabled", "disabled");
  document.getElementById("password").setAttribute("disabled", "disabled");
  document.getElementById("login_button").setAttribute("disabled", "disabled");

  let pp = new Promise((resolve, reject) => {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    var xmlhttp = getXmlHttp();
    xmlhttp.open('POST', 'https://us-central1-mercdev-academy.cloudfunctions.net/login', true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send('{ "email": "' + login + '", "password": "' + password+'" }');
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        resolve(xmlhttp);
      }
    };

  })

  let result = await pp;
  if(result.status == 200){
    var user = JSON.parse(result.responseText);
    document.location="profile.html?name="+user.name+"&photoUrl="+user.photoUrl;
  }
  if(result.status == 0) {
    document.getElementById("errortext").textContent="No internet connection";
    document.getElementById("error").style="display: inline-block;";
  }
  if(result.status == 503) {
    document.getElementById("errortext").textContent="Server is temporarily unavailable";
    document.getElementById("error").style="display: inline-block;";
  }
  if(result.status == 400) {
    document.getElementById("errortext").textContent="E-Mail or password is incorrect";
    document.getElementById("error").style="display: inline-block;";
    document.getElementById("login").classList.add("error");
    document.getElementById("password").value = "";
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
