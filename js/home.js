function toggle_left_panel() {
  let left_panel = document.querySelector(".left-panel");
  visible = !visible;

  if (visible) {
    left_panel.style.display = "none";
  } else {
    left_panel.style.display = "flex";
  }
}

function change_welcome(welcomeMessage) {
  let fixedWelcomeMessage = document.querySelector("#welcome-message-fixed");
  fixedWelcomeMessage.innerHTML = welcomeMessage["fixed-welcome-message"];

  const animatedWelcomeMessage = welcomeMessage["animated-welcome-message"];

  type(animatedWelcomeMessage);
}

function change_home(home) {
  let background = home["home-background"];
  let home_div = document.querySelector("#home");

  if (background === undefined) {
    background = "./img/bg.jpg";
  }

  home_div.style.background = `url("${background}")`;
  home_div.style.backgroundSize = "cover";

  const welcomeMessage = home["welcome-message"];
  change_welcome(welcomeMessage);
}
