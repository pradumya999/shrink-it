const loginButton = document.querySelector("#login-button");
const passwordInput = document.querySelector("#password-input");

function login(){
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

    const credentials = {
        username: username,
        email: email,
        password: password
    }

    fetch("/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(async (response)=>{
        response = await response.json();
        if(response.check === true) window.location.href = "./homepage.html";
        else{
            const errorDiv = document.querySelector(".login-error");
            errorDiv.children[1].children[0].textContent = response.msg;
            errorDiv.setAttribute("style", "display: flex");
        }
    });
};

passwordInput.addEventListener("keydown", (event)=>{
    if(event.key === "Enter") login();
});
loginButton.addEventListener("click", login);