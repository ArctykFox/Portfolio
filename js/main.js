/*START OF VARIABLES*/
let icons = {};
let visible = true;
/*END OF VARIABLES*/
function get_icon(element) {
  const icon = icons[element];

  if (icon === undefined) {
    return icons["default"];
  }

  return icon;
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
