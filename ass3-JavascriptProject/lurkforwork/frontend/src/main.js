import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';
import { showLogedInPage } from './jobFeeds.js';
import * as cfs from'./commonFuncs.js';
const {switchHide, raisePopup, getURL, fetchAPI, createAnElement, makeTimeUserReadable, createListOfElements} = cfs;
console.log('Let\'s go!');

document.getElementById("login-button").addEventListener("click", () => {
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    let usersLikeDiv1 = document.getElementById("show-users-like")
    console.log(usersLikeDiv1)
    let usersLikeDiv9 = document.getElementById("show-users-like")
    console.log(usersLikeDiv9)
    fetchAPI("auth/login", 'POST', {email: loginEmail,
password: loginPassword
    }).then((res)=>{
        console.log("plll")
        let ss = document.getElementById("show-users-like")
        console.log(ss)
        return res.json()
    }).then((TokenId)=>{
        
        if (TokenId.error) {
            raisePopup(TokenId.error);
        } else {
            localStorage.setItem("token", TokenId.token);
            console.log("8888")
            showLogedInPage()
        }
    }).catch((error)=>{
        alert(error)
    })
})

document.getElementById("register-button").addEventListener("click", () => {
    const registerEmail = document.getElementById("register-email").value;
    const registerPassword = document.getElementById("register-password").value;
    const registerName = document.getElementById("register-name").value;
    const registerConfirmPassword = document.getElementById("register-confirm-password").value;

    // fetchAPI retun a promise, use .then and .catch to solve a promise, this promise result is a response. res is the returned response
    if (registerPassword !== registerConfirmPassword){
        alert("Confirmed password entered differently with password, please enter again")
    } else {
        fetchAPI("auth/register", 'POST', {
            "email": registerEmail,
            "password": registerPassword,
            "name":registerName
        }).then((res)=>{
            // return a promise, this promise result is an object, returned data is an object
            return res.json()
        }).then((TokenId)=>{
            if (TokenId.error) {
                raisePopup(TokenId.error)
            }
        }).catch((error)=>{
            // page erros, something wrong with url, error inside fetch
    
            alert(error)
        })
    }
    
})

const loginPage = document.getElementById("login-page");
const registerPage = document.getElementById("register-page");

document.getElementById("nav-register").addEventListener("click", ()=>{
    switchHide(registerPage, loginPage);
})

document.getElementById("nav-login").addEventListener("click", ()=>{
    switchHide(loginPage, registerPage);
})



