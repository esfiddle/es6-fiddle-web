const onlyLoggedOut = document.querySelector(".only-loggedout"),
  onlyLogged = document.querySelector(".only-logged"),
  onlyLoggedProfile = document.querySelector(".only-logged-profile"),
  authReq = new XMLHttpRequest();

// See if user is authenticated
authReq.open("GET", "/authenticated", true);
authReq.onload = function() {
  // eslint-disable-line
  const data = JSON.parse(this.response);
  if (data.logged) {
    onlyLogged.style.display = "block";
    onlyLoggedProfile.style.display = "block";
  } else {
    onlyLoggedOut.style.display = "block";
  }
};
authReq.send();
