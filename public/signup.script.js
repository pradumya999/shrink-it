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

    const credentials = {
        username: username,
        email: email,
        password: password
    }

    fetch("/signup", {
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
    })
    .catch((error)=>{
        alert(error.msg);
    });
};

passwordInput.addEventListener("keydown", (event)=>{
    if(event.key === "Enter") signup();
});
signupButton.addEventListener("click", signup);