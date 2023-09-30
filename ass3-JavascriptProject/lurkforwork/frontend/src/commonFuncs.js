import { BACKEND_PORT } from './config.js';
export function switchHide(show, hideThis) {
    show.classList.remove("hide");
    hideThis.classList.add("hide");
}

export function raisePopup(popupMessge) {
    let popupWin = document.getElementById("popup");
    popupWin.appendChild(document.createTextNode(popupMessge));
    popupWin.classList.remove("hide");
}

export function getURL(dir) {
    return "http://localhost:" + BACKEND_PORT + '/' + dir;
}

export function fetchAPI(dir, method, body) {
    
    if (method === "POST") {
        let sss = document.getElementById("show-users-like")
        console.log(sss)
        return fetch(getURL(dir), {
            method: method,
            headers:{
                'Content-Type': 'application/json; charset=UTF-8'
    
            },
            body: JSON.stringify(body)  
        })
    } else if (method === "GET") {
        
        const token = localStorage.getItem("token");
        return fetch(getURL(dir), {
            method: method,
            headers:{'Authorization': `Bearer ${token}`}
        })
    }
    
}

export function createAnElement(nodeType, classes, contex, parent, attributes){
    const ele = document.createElement(nodeType);
    
    if (classes != "") {
        const classesList = classes.split(" ");
        classesList.forEach((aClass)=>{
        ele.classList.add(aClass)
    })
    }

    if (attributes !== ""){
        const keysAtrribute = Object.keys(attributes);
        keysAtrribute.forEach((attribute)=>{
            ele.setAttribute(attribute, attributes[attribute])
            console.log(ele)
        })
    }
    
    
    if (nodeType === "img") {
        ele.src = contex;
    } else if (nodeType != "input"){
        ele.textContent = contex;
    }
    parent.appendChild(ele);
    return ele;
}

export function makeTimeUserReadable(isoString){
    let readableTime = isoString.substring(0,10);
    const ddMmYyyy = readableTime.split("-");
    return ddMmYyyy[2] + "/" + ddMmYyyy[1] + "/" + ddMmYyyy[0];

}

export function createListOfElements(listElements, elementKey) {
    console.log(listElements)
    let result = document.createElement("ul")
    listElements.forEach((ele)=>{
        createAnElement("li", "", ele[elementKey], result, "")
    })
    return result;
}