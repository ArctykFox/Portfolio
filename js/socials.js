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
