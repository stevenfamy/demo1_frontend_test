function doOauth(response, type = "Google") {
  const url = "https://demo1.stevenfamy.me:81/login-oauth";
  const params = {
    type: type,
    jwtToken:
      type === "Google"
        ? response.credential
        : response.authResponse.accessToken,
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

        document.getElementById("loginMessage").innerHTML = errRes;
      }

      if (err.response.status === 404 || err.response.status === 500)
        document.getElementById("loginMessage").innerHTML =
          err.response.data.error;
    });
}

//fb login
function statusChangeCallback(response) {
  console.log(response);
  if (response.status === "connected") {
    FB.api("/me", { fields: "name, email" }, function (response2) {
      doOauth(response, "Facebook");
    });
  } else {
    console.log("Need to relogin");
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}
