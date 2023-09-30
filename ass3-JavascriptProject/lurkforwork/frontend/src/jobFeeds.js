import * as cfs from'./commonFuncs.js';
const {switchHide, raisePopup, getURL, fetchAPI, createAnElement, makeTimeUserReadable, createListOfElements} = cfs;

const logedOutSection = document.getElementById("loged-out-section");
const logedInSection = document.getElementById("loged-in-section");

function showOneJobFeed(jobFeed, feedIndex){
    
    let usersLikeDiv1 = document.getElementById("show-users-like")
    console.log(usersLikeDiv1)
    const cardContainer= document.createElement("div");
    cardContainer.classList.add("card", "card-body", "card-size");

    let postTime = new Date(jobFeed.createdAt);
    let currentTime = new Date().toISOString();
    currentTime = new Date(currentTime);
    postTime = currentTime - postTime;
    const hours = postTime / (1000*60*60);
    if (hours >= 24) {
        postTime = makeTimeUserReadable(jobFeed.createdAt);
    } else {
        let PThours = Math.floor(hours);
        let PTminutes = Math.round((hours - PThours) * 60);
        postTime = `${PThours} hours and ${PTminutes} mins ago`;
    }
    
    const posterAndTimeDiv = createAnElement("div", "", "", cardContainer, "")

    fetchAPI(`user?userId=${jobFeed.creatorId}`, "GET", {}).then((resp) => {
        return resp.json();
    }).then((posterInfo)=>{
        createAnElement("p", "text-muted fs-6", `${posterInfo.name} | posted ${postTime}`, posterAndTimeDiv, "")
    })

    createAnElement("h4", "card-title", jobFeed.title, cardContainer, "");

    const startTime = makeTimeUserReadable(jobFeed.start) + " " + jobFeed.start.substring(11,19);
    createAnElement("p", "text-muted fs-6", `Job starts at: ${startTime}`, cardContainer, "");

    createAnElement("p", "card-text", jobFeed.description, cardContainer, "")
    createAnElement("img", "card-img-top", jobFeed.image, cardContainer, "");
    const commentsLikesContainer = createAnElement("div", "text-muted d-flex mb-3", "", cardContainer, "");
    createAnElement("div", "hoverBlue me-auto p-2", `${jobFeed.comments.length} comments`, commentsLikesContainer,"");
    // here here here here here here
    
    createAnElement("button", "btn btn-light", "👍  Like me", commentsLikesContainer, "");
    createAnElement("div", "hoverBlue p-2", `${jobFeed.likes.length} likes`, commentsLikesContainer, {"data-bs-toggle":"modal", "data-bs-target":"#staticBackdrop"});
    let usersLikeDiv = document.getElementById("show-users-like")
    usersLikeDiv.textContent = "";
    console.log(999)
    console.log(usersLikeDiv)
    let usersList = createListOfElements(jobFeed.likes, "userName");
    console.log("uuuu")
    usersLikeDiv.appendChild(usersList);
    console.log(usersLikeDiv)
    console.log(feedIndex, jobFeed.likes.length)
    
    
    const stackContainer = document.createElement("div");
    stackContainer.classList.add("hstack", "gap-3");
    createAnElement("input", "form-control me-auto", "", stackContainer, {type:"text", placeholder:"Add your comments here..."})
    createAnElement("button", "btn btn-secondary", "send", stackContainer, {type:"button"});
    cardContainer.appendChild(stackContainer);

    createAnElement("div", "", "", cardContainer, {id:`commentsDiv${feedIndex}`})
    logedInSection.appendChild(cardContainer);

}

export function showLogedInPage() {
    // hide loged out section pages and show loged in section
    console.log("uuuu")
    switchHide(logedInSection, logedOutSection)
    let usersLikeDiv1 = document.getElementById("show-users-like")
        console.log(usersLikeDiv1)
    fetchAPI("job/feed?start=0", "GET", {}).then((resp)=>{
        let usersLikeDiv1 = document.getElementById("show-users-like")
        console.log(usersLikeDiv1)
        return resp.json();
    }).then((jobsFeed)=>{
        let usersLikeDiv = document.getElementById("show-users-like")
        console.log(usersLikeDiv)
        jobsFeed.sort((feed1, feed2)=> {
            const feed1CreateTime = new Date(feed1.createdAt);
            const feed2CreateTime = new Date(feed2.createdAt);
            return feed2CreateTime-feed1CreateTime
        })
        // .forEach takes in a function
        // functionName() is not a function, unless return value is a function.
        // functionName represent a function
        console.log("huhuhu")
        let usersLikeDiv1 = document.getElementById("show-users-like")
        console.log(usersLikeDiv1)
        jobsFeed.forEach(showOneJobFeed)
        
    }).catch((error) => {
        alert(error)
    })
}