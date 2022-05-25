function doLogout() {
  const cookieSessions = getCookie("authToken");

  const url = "https://aha.stevenfamy.me:81/logout";
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
