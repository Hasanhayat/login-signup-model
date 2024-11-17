let icon = document.querySelector("i");
let passwordInput = document.querySelector(".password");

icon.addEventListener("mousedown", () => {
  // Show password
  passwordInput.type = "text";
  icon.classList.replace("fa-eye", "fa-eye-slash");
});

icon.addEventListener("mouseup", () => {
  // Hide password
  passwordInput.type = "password";
  icon.classList.replace("fa-eye-slash", "fa-eye");
});

// For touch devices
icon.addEventListener("touchstart", () => {
  passwordInput.type = "text";
  icon.classList.replace("fa-eye", "fa-eye-slash");
});

icon.addEventListener("touchend", () => {
  passwordInput.type = "password";
  icon.classList.replace("fa-eye-slash", "fa-eye");
});

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
      try {
        if (userData.password.length > 12) {
          throw "Password must be a maximum of 12 characters";
        }
        if (userData.password.length < 8) {
          throw "Password must be a minimum of 8 characters";
        }
      } catch (error) {
        console.error(error);
        signup_note.innerHTML = error;
        return;
      }

      if (users) {
        let emailExist;
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == userData.email) {
            emailExist = true;
            break;
          }
        }

        try {
          if (emailExist) {
            throw "Email already exists";
          }
          users.push(userData);
          localStorage.setItem("users", JSON.stringify(users));
          signup_note.innerHTML = "Signup successful!";
          window.location.href = "./dashboard.html";
        } catch (error) {
          console.error(error);
          signup_note.innerHTML = error;
          return;
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
      if (users) {
        for (let i = 0; i < users.length; i++) {
          if (
            users[i].email == login_email &&
            users[i].password == login_password
          ) {
            isDataMatched = true;
          }
        }
      } else {
        login_note.innerHTML = "Signup to register yourself.";
        return;
      }
      if (isDataMatched) {
        window.location.href = "./dashboard.html";
        login_note.innerHTML = "";
        console.log("good");
      } else {
        login_note.innerHTML = "Invalid Email or Password.";
      }
    };
    login();
  }
}
