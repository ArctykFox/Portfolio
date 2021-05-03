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
