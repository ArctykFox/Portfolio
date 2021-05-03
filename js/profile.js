function change_name(name) {
  let elements = document.querySelectorAll("[id=name]");
  elements.forEach((element) => {
    element.innerHTML = name;
  });
  return 0;
}

function change_profile_picture(profile_picture_link) {
  let profile_picture = document.querySelector("#profile-picture");

  profile_picture.src = profile_picture_link;

  return 0;
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
