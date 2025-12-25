const signupButton = document.querySelector("#signup-button");
const passwordInput = document.querySelector("#password-input");

function signup(){
    const username = document.querySelector("#username-input").value;
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    if(username == ""){
        document.querySelector("#username-input").focus();
        return;
    }

    if(email == ""){
        document.querySelector("#email-input").focus();
        return;
    }

    if(password == ""){
        document.querySelector("#password-input").focus();
        return;
    }

    const errorDiv = document.querySelector(".signup-error");
    errorDiv.setAttribute("style", "display: none");

    signupButton.textContent = ". . .";
    signupButton.style.backgroundColor = "black";

    const credentials = {
        username: username,
        email: email,
        password: password
    }

    const fetchPromise = fetch("/signup", {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response=>response.json());

    const delayPromise = new Promise(resolve=>setTimeout(resolve, 1500));

    Promise.all([fetchPromise, delayPromise])
        .then(([response])=>{
            if(response.check === true){
                window.location.href = "./homepage.html";
            } else{
                signupButton.style.backgroundColor = "";
                signupButton.textContent = "login";

                const errorDiv = document.querySelector(".login-error");
                errorDiv.children[1].children[0].textContent = response.msg;
                errorDiv.setAttribute("style", "display: flex");
            }
    });
};

passwordInput.addEventListener("keydown", (event)=>{
    if(event.key === "Enter") signup();
});
signupButton.addEventListener("click", signup);