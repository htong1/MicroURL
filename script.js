function shorten(){
let url = document.getElementById("url").value;
let result = document.getElementById("microURL");
let token = map(url);
result.innerHTML = makeMURL(token);
}

function createToken(){
let charMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let token = "";
for(let i = 0; i < 6; i++){
  token += charMap[Math.floor(Math.random()*62)];
}
return token;
}

function map(url){
let token = createToken();
if(localStorage.getItem(token)){
  if(url != localStorage.getItem(token)){
     map();
  }
} else {
  localStorage.setItem(token, url);
  return token;
}
}

function makeMURL(token){
  let mURL = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + token;
  return mURL;
}

function extractToken(){
  debugger;
  let extractedToken = window.location.search;
  extractedToken = extractedToken.slice(1);
  let open = localStorage.getItem(extractedToken);
  window.open(open);
}