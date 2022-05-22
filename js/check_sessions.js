// autoload to check session
function checkSessions() {
  const cookieSessions = getCookie("authToken");
  if (
    !cookieSessions &&
    window.location.pathname !== "/" &&
    window.location.pathname !== "/signup/" &&
    window.location.pathname !== "/verified-email/"
  )
    window.location.replace("/");

  if (
    cookieSessions &&
    (window.location.pathname === "/" ||
      window.location.pathname === "/signup/" ||
      window.location.pathname === "/verified-email/")
  )
    window.location.replace("/dashboard");

  if (window.location.pathname === "/verified-email/") doVerification();
}
