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
        const mainBody = document.querySelector(".main-body");
        mainBody.setAttribute("style", "display: block;")
    } else {
        const noAcessBody = document.querySelector(".no-access");
        noAcessBody.setAttribute("style", "display: block;")
    }
});

function isValidURL(url){
    try{
        new URL(url);
        return true;
    } catch(e){
        return false;
    }
}

function generateQR(){
    const newURL = document.querySelector("#newqr-input").value;
    if(newURL == ""){
        document.querySelector("#newqr-input").focus();
        return;
    } else{
        if(!isValidURL(newURL)){
            setTimeout(()=>{
            const errorDiv = document.querySelector(".error");
            errorDiv.children[1].children[0].textContent = "the pasted link in invalid";
            errorDiv.setAttribute("style", "display: flex;");
            }, 100);
        } else{
            generateButton.textContent = "";
            const loader = document.createElement("img");
            loader.src = "./images/loader.gif";
            loader.style.width = "40px";
            loader.setAttribute("id", "newURL-button-img");

            generateButton.style.paddingRight = "21px";
            generateButton.style.paddingLeft = "21px";
            generateButton.style.backgroundColor = "black"; 
            generateButton.append(loader);

            const errorDiv = document.querySelector(".error");
            errorDiv.setAttribute("style", "display: none;");

            const longURL = {
                url: newURL
            }

            const fetchPromise = fetch("/qrcode", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(longURL)
            }).then(response=>response.json());

            const delayPromise = new Promise(resolve=>setTimeout(resolve, 3000));

            Promise.all([fetchPromise, delayPromise])
                .then(([response])=>{
                    loader.remove();
                    generateButton.textContent = "generate";
                    generateButton.style.backgroundColor = "";
                    generateButton.style.paddingRight = "";
                    generateButton.style.paddingLeft = "";

                    const imageElement = document.querySelector("#qrcode-img");
                    imageElement.src = `${response.qrcode}`;
                    const downloadButton = document.querySelector("#download-button-text");
                    downloadButton.href = `${response.qrcode}`;
                    const QRdiv = document.querySelector(".qrcode-body");
                    console.log("here!");
                    QRdiv.setAttribute("style", "display: block;");
                });
        }
    }
}

const generateButton = document.querySelector("#newqr-button");
generateButton.addEventListener("click", generateQR);

const inputElement = document.querySelector("#newqr-input");
inputElement.addEventListener("keydown", (event)=>{
    if(event.key === "Enter") generateQR();
});
