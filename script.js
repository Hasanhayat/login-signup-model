function user() {
  let users = JSON.parse(localStorage.getItem("users"));

  if (window.location.href.includes("signup.html")) {
    let signup_name = document.querySelector(".signup-name").value;
    let signup_email = document.querySelector(".signup-email").value;
    let signup_password = document.querySelector(".signup-password").value;
    let signup_note = document.querySelector(".signup-note");

    const signup = () => {
      console.log("signup");

      let userData = {
        name: signup_name,
        email: signup_email,
        password: signup_password,
      };

      if (users) {
        let emailExist;
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == userData.email) {
            emailExist = true;
            break;
          }
        }
        if (!emailExist) {
          users.push(userData);
          localStorage.setItem("users", JSON.stringify(users));
          signup_email_note.innerHTML = "";
          window.location.href = "./dashboard.html";
        } else {
          signup_note.innerHTML = "Email already exist";
        }
      } else {
        localStorage.setItem("users", JSON.stringify([userData]));
        window.location.href = "./dashboard.html";
      }
    };
    signup();
  } else if (window.location.href.includes("index.html")) {
    let login_email = document.querySelector(".login-email").value;
    let login_password = document.querySelector(".login-password").value;
    let login_note = document.querySelector(".login-note");

    let isDataMatched;

    const login = () => {
      console.log("login");
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].email == login_email &&
          users[i].password == login_password
        ) {
          isDataMatched = true;
        }
      }
      if (isDataMatched) {
        window.location.href = "./dashboard.html";
        login_note.innerHTML = "";
        console.log("good");
      } else {
        login_note.innerHTML =
          "Invalid Email or Password.<br> Signup to register yourself.";
      }
    };
    login();
  }
}
