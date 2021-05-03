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
