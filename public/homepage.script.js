let user = false;

fetch("/user", {
    method: 'GET',
    credentials: 'include'
})
.then(async (response) => {
    const data = await response.json();
    
    if(data.type === true) {
        user = true;
    } else {
        user = false;
    }
    
    if(user) {
        const alsobuttonClass = document.querySelector(".signed-in");
        alsobuttonClass.setAttribute("style", "display: block; display: flex");
    } else {
        const buttonClass = document.querySelector(".anonymous");
        buttonClass.setAttribute("style", "display: block; display: flex;");
    }
});

function logout(){
    fetch("/logout", {
        method: 'DELETE',
        credentials: 'include'
    })
    .then(()=>{
        window.location.href = "./homepage.html";
    });
}

function isValidURL(url){
    try{
        new URL(url);
        return true;
    } catch(e){
        return false;
    }
}

function shrink(){
    const errorDiv = document.querySelector(".error");
    errorDiv.setAttribute("style", "display: none;");

    const URLdiv = document.querySelector(".short-url");
    URLdiv.setAttribute("style", "display: none;");

    const newURL = document.querySelector("#newURL-input").value;
    if(newURL == ""){
        document.querySelector("#newURL-input").focus();
        return;
    } else{
        if(!isValidURL(newURL)){
            setTimeout(()=>{
            const errorDiv = document.querySelector(".error");
            errorDiv.children[1].children[0].textContent = "the pasted link in invalid";
            errorDiv.setAttribute("style", "display: flex;");
            }, 100);
        } else{
            shrinkButton.textContent = "";
            const loader = document.createElement("img");
            loader.src = "./images/loader.gif";
            loader.style.width = "60px";
            loader.setAttribute("id", "newURL-button-img");

            shrinkButton.style.paddingRight = "36px";
            shrinkButton.style.paddingLeft = "38px";
            shrinkButton.style.backgroundColor = "black"; 
            shrinkButton.append(loader);

            const errorDiv = document.querySelector(".error");
            errorDiv.setAttribute("style", "display: none;");

            const longURL = {
                url: newURL
            }

            const fetchPromise = fetch("/shrink", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(longURL)
            }).then(response=>response.json());

            const delayPromise = new Promise(resolve=>setTimeout(resolve, 2000));

            Promise.all([fetchPromise, delayPromise])
                .then(([response])=>{
                    if(response.check === true){
                        loader.remove();
                        shrinkButton.textContent = "shrink";
                        shrinkButton.style.backgroundColor = "";
                        
                        const linkElement = document.querySelector("#shrinked-url");
                        linkElement.href = `https://shrinkits.vercel.app/${response.urlkey}`;
                        linkElement.textContent = `https://shrinkits.vercel.app/${response.urlkey}`;
                        URLdiv.setAttribute("style", "display: flex;");
                    } else{
                        loader.remove();
                        shrinkButton.textContent = "shrink";
                        shrinkButton.style.backgroundColor = "";

                        setTimeout(()=>{
                        const errorDiv = document.querySelector(".error");
                        errorDiv.children[1].children[0].textContent = `${response.msg}`;
                        errorDiv.setAttribute("style", "display: flex;");
                        }, 100); 
                    }
                });
        }
    }
}

async function copyURL(){
    const link = document.querySelector("#shrinked-url").textContent;
    await navigator.clipboard.writeText(link);
}

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", logout);

const shrinkButton = document.querySelector("#newURL-button");
shrinkButton.addEventListener("click", shrink);

const inputElement = document.querySelector("#newURL-input");
inputElement.addEventListener("keydown", (event)=>{
    if(event.key == "Enter") shrink();
});

const copyButton = document.querySelector("#copy-url-img");
copyButton.addEventListener("click", copyURL);