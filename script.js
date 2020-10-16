function shorten() {
  debugger;
    let url = document.getElementById("url").value;
    let result = document.getElementById("microURL");
    let token = linkToToken(url);
    result.innerHTML = makeMURL(token);
}

function createToken() {
    let charMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < 6; i++) {
        token += charMap[Math.floor(Math.random() * 62)];
    }
    return token;
}

function linkToToken(url) {
    let token = createToken();
    if (remoteGlobalStorage.getItem(url)) {
        return remoteGlobalStorage.getItem(url);
    } else if (remoteGlobalStorage.getItem(token)) {
        if (url != remoteGlobalStorage.getItem(token)) {
            linkToToken();
        }
    } else {
        remoteGlobalStorage.setItem(url, token);
        remoteGlobalStorage.setItem(token, url);
        return token;
    }
}

function makeMURL(token) {
    let mURL = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + token;
    return mURL;
}

function extractToken() {
    let extractedToken = window.location.search;
    if(extractedToken[0] == "?"){
      extractedToken = extractedToken.slice(1);
    let open = remoteGlobalStorage.getItem(extractedToken);
    window.open(open, "_parent");
    }
}


const remoteGlobalStorage = {
DBURL :"https://kv.repl.it/v0/eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI5MjcxMzEsImlhdCI6MTYwMjgxNTUzMSwiaXNzIjoiY29ubWFuIiwiZGF0YWJhc2VfaWQiOiI4MTgxYTJkMS01ZTU5LTRmYTgtYTI4NC1hYjZkOTViZDEyODEifQ.UvuWCxdqAFegNvjXdiC8jm6kAfdxRb-Ln8j_pSP9BX1qfg1mGVOMTe22GrB0i42tlEuppdYeyJv34ErcxtTcYQ",

getItem(key){
let newURL = this.DBURL + "/" + "key";
let options = {
    method: 'GET',
    mode: 'no-cors',
    headers:{
       "Content-Type": "application/x-www-form-urlencoded",
       "Accept": "*/*"
    }
};
fetch(newURL, options)
.then(response => response.json())

.then(res => {
makeMURL(token);
})
},

setItem(key, value){
let options = {
    method: 'POST',
    body : key + "=" + value,
    mode: 'no-cors',
    headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*"
    }
};

fetch(this.DBURL, options)
    //.then(res => res.json())
    .then(res => console.log(res))
    .catch((error) => {
  console.error('Error:', error);
});
},

removeItem(key){

}
}