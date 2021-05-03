/*START OF VARIABLES*/
let strings = [];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let icons = {};
/*END OF VARIABLES*/
function type() {
  var options = {
    strings: strings,
    typeSpeed: 80,
    loop: true,
    smartBackspace: true,
    backDelay: 3 * 1000, //3 SECONDS
  };

  var typed = new Typed(".welcome-message-animated", options);
}

function check_project(element, array) {
  try {
    array = array.map((element) => element.toLowerCase()); //CONVERTS PROJECT NAMES TO LOWERCASE
  } catch {
    return null;
  }
  try {
    return array.includes(element.toLowerCase());
  } catch {
    return null;
  }
}

function get_icon(element) {
  const icon = icons[element];

  if (icon === undefined) {
    return icons["default"];
  }

  return icon;
}

function change_name(name) {
  let elements = document.querySelectorAll("[id=name]");
  elements.forEach((element) => {
    element.innerHTML = name;
  });
  return 0;
}

function change_socials(socials) {
  var profile_links_ul = document.getElementById("profile-links-ul");

  try {
    for (let [key, value] of Object.entries(socials)) {
      const social_name = key;
      const social_link = value;
      const social_icon = get_icon(social_name);

      const social_template = `
      <li>
        <a class="link" id="${social_name}" href="${social_link}">
          ${social_icon}
        </a>
      </li>
      `;

      profile_links_ul.innerHTML += social_template;
    }
  } catch {
    //PASS
  }

  return 0;
}

function change_profile_picture(profile_picture_link) {
  let profile_picture = document.querySelector("#profile-picture");

  profile_picture.src = profile_picture_link;

  return 0;
}

function change_about(about) {
  let aboutTtitleDescription = document.querySelector(
    "#about-title-description"
  );
  let aboutDescription = document.querySelector("#about-description");
  let aboutImages = document.querySelector("#about-images");

  aboutTtitleDescription.innerHTML = about["about-title-description"];
  aboutDescription.innerHTML = about["about-description"];

  const aboutImagesLinks = about["about-images"];

  aboutImagesLinks.forEach((imageLink) => {
    aboutImages.innerHTML += `<img src="${imageLink}" alt="">`;
  });
}

async function change_projects(githubRepos, github) {
  const githubReposWhiteList = github["github-projects"];
  let projectsWrapper = document.querySelector("#projects-wrapper");

  githubRepos.forEach((project) => {
    const project_name = project["name"];
    let check = check_project(project_name, githubReposWhiteList);

    if (check === true || check === null) {
      const project_description = project["description"];
      const project_url = project["html_url"];

      const project_template = `
    <div class="project">
            <div class="project-image">
              <a href=${project_url}>
                <img src="/img/project.jpg" alt="" />
              </a>
            </div>
            <div class="project-title">
              <h1>${project_name}</h1>
            </div>
            <div class="project-description">
              <p>
                ${project_description}
              </p>
            </div>
    </div>
    `;

      projectsWrapper.innerHTML += project_template;
    } else {
      // PASS
    }
  });

  return 0;
}

function change_skills(skills) {
  const skillsWrapper = document.querySelector("#skills-wrapper");
  skills.forEach((skill) => {
    skill = skill.toLowerCase();
    let skillName = skill[0].toUpperCase() + skill.slice(1);
    skillName = skillName.replace("-", " ");
    const skillIcon = get_icon(skill);
    const skillTemplate = `
    <div class="skill">
      <div class="skill-icon skill-${skill}">
        ${skillIcon}
      </div>
      <div class="skill-title">
        <h1>${skillName}</h1>
      </div>
    </div>
  `;
    skillsWrapper.innerHTML += skillTemplate;
  });
}

function change_welcome(welcomeMessage) {
  let fixedWelcomeMessage = document.querySelector("#welcome-message-fixed");
  fixedWelcomeMessage.innerHTML = welcomeMessage["fixed-welcome-message"];

  const animatedWelcomeMessage = welcomeMessage["animated-welcome-message"];
  strings = animatedWelcomeMessage;

  type();
}

function change_profile(profile, githubProfile) {
  let name;
  let profile_picture;

  if (profile["name"] === undefined) {
    name = githubProfile["login"];
  } else {
    name = profile["name"];
  }
  if (profile["profile-picture"] == undefined) {
    profile_picture = githubProfile["avatar_url"];
  } else {
    profile_picture = profile["profile-picture"];
  }

  change_name(name);
  change_profile_picture(profile_picture);
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

async function main() {
  const config_url = "/src/config.json";
  const icons_url = "/src/icons.json";
  const config_promise = await fetch(config_url);
  const icons_promise = await fetch(icons_url);
  const config_response = await config_promise.json();
  const icons_response = await icons_promise.json();

  icons = icons_response;

  const profile = config_response["profile"];
  const home = config_response["home"];
  const about = config_response["about"];
  const skills = config_response["skills"];
  const github = config_response["github"];
  const socials = profile["socials"];
  const githubUsername = github["github-username"];

  const github_url = `https://api.github.com/users/${githubUsername}`;
  const github_repos_url = `https://api.github.com/users/${githubUsername}/repos`;
  const github_promise = await fetch(github_url);
  const github_response = await github_promise.json();
  const github_repos_promise = await fetch(github_repos_url);
  const github_repos_response = await github_repos_promise.json();

  const githubProfile = github_response;
  const githubRepos = github_repos_response;

  change_home(home);
  change_profile(profile, githubProfile);
  change_projects(githubRepos, github);
  change_socials(socials);
  change_skills(skills);
  change_about(about);

  return 0;
}

main();
