// autoload to check session
function checkSessions() {
  const cookieSessions = getCookie("authToken");
  if (
    !cookieSessions &&
    window.location.pathname !== "/" &&
    window.location.pathname !== "/signup/"
  )
    window.location.replace("/");

  if (
    cookieSessions &&
    (window.location.pathname === "/" ||
      window.location.pathname === "/signup/")
  )
    window.location.replace("/dashboard");
}
