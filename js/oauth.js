function doGoogleLogin(response) {
  const url = "http://localhost:5000/login-oauth";
  const params = {
    type: "Google",
    jwtToken: response.credential,
  };

  axios
    .post(url, params)
    .then((res) => {
      if (res.status === 200) setCookie("authToken", res.data.authToken);

      window.location.replace("/dashboard");
    })
    .catch((err) => {
      if (err.response.status === 400) {
        let errRes = err.response.data.error;

        if (!err.response.data.Email_verification) {
          errRes +=
            ", <a href='#' onclick='resendEmail();'>Click here to resend email verification.</a>";
        }
        document.getElementById("loginMessage").innerHTML = errRes;
      }

      if (err.response.status === 404 || err.response.status === 500)
        document.getElementById("loginMessage").innerHTML =
          err.response.data.error;
    });
}
