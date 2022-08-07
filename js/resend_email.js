function resendEmail() {
  const email = document.getElementById("email").value;

  const url = "https://demo1.stevenfamy.me:81/resend-verification-email";
  const params = {
    email: document.getElementById("email").value,
  };
  axios
    .post(url, params)
    .then((res) => {
      console.log(res);
      const successMsg = "Resend!, Check your email for verification.";
      if (res.status === 200)
        if (window.location.pathname === "/") {
          document.getElementById("loginMessage").innerHTML = successMsg;
        } else if (window.location.pathname === "/signup/") {
          document.getElementById("signupMessage").innerHTML = successMsg;
        }
    })
    .catch((err) => {
      if (err.response.status === 400)
        if (window.location.pathname === "/") {
          document.getElementById("loginMessage").innerHTML =
            err.response.data.error !== undefined
              ? err.response.data.error
              : err.response.data;
        } else if (window.location.pathname === "/signup/") {
          document.getElementById("signupMessage").innerHTML =
            err.response.data.error !== undefined
              ? err.response.data.error
              : err.response.data;
        }
      if (err.response.status === 404)
        if (window.location.pathname === "/") {
          document.getElementById("loginMessage").innerHTML =
            err.response.data.error;
        } else if (window.location.pathname === "/signup/") {
          document.getElementById("signupMessage").innerHTML =
            err.response.data.error;
        }
    });
}
