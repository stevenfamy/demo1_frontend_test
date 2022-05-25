function doLogout() {
  const cookieSessions = getCookie("authToken");

  const url = "http://localhost:5000/logout";
  const headers = {
    "Content-Type": "application/json",
    authToken: cookieSessions,
  };

  axios
    .post(url, {}, { headers: headers })
    .then((res) => {
      eraseCookie("authToken");
      window.location.replace("/dashboard");
    })
    .catch((err) => {
      if (err.response.status === 401) {
        eraseCookie("authToken");
        window.location.replace("/dashboard");
      }
    });
}
