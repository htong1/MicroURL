function shorten(){
debugger;
let url = document.getElementById("url").value;
let result = document.getElementById("microURL");
map(url);
}

function createToken(){
let charMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let token = "";
for(let i = 0; i < 6; i++){
  token += charMap[Math.floor(Math.random()*62)];
}
return token;
}

const urlMap = new Map();

function map(url){
let token = createToken();
if(urlMap.has(token)){
  if(url != urlMap.get(token)){
     map();
  }
} else {
  urlMap.set(token, url);
}
}

