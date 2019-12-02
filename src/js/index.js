import { projects } from "./projects";
import { skills } from "./skills";

//NAVIGATION - BACK TO TOP

const topButton = document.querySelector(".back-to-top");
const scrollFunction = () => {
  document.body.scrollTop > 200 || document.documentElement.scrollTop > 200
    ? (topButton.style.visibility = "visible")
    : (topButton.style.visibility = "hidden");
};
window.onscroll = () => scrollFunction();

topButton.onclick = () => window.scrollTo(0, 0);

// NAVIGATION - SCROLL
const scrollPage = targetId => {
  const target = document.querySelector(targetId);
  const targetLeftPosition = target.getBoundingClientRect().left;
  const targetTopPosition = target.getBoundingClientRect().top;
  window.scrollTo(targetLeftPosition, targetTopPosition);
  // without options, it works with Edge and Safari
};

const navToSections = [
  { nav: "#nav-home", section: "#home-section" },
  { nav: "#nav-about", section: "#about-section" },
  { nav: "#nav-projects", section: "#projects-section" },
  { nav: "#nav-gallery", section: "#gallery-section" },
  { nav: "#nav-skills", section: "#skills-section" },
  { nav: "#nav-contact", section: "#contact-section" }
];

navToSections.map(element => {
  const navButton = document.querySelector(element.nav);
  navButton.addEventListener("click", () => {
    scrollPage(element.section);
  });
});

// PROJECTS
const projectList = document.querySelector(".projectList");
console.log(projectList);
projects.map((project, index) => {
  const oneProject = document.createElement("article");
  oneProject.className = "project-container";
  oneProject.innerHTML = `
    <div class="project-image">
                <img src="" alt="" />
              </div>
              <div class="project-text">
                <h2 class="project-title">${project.title}</h2>
                <p class="project-tool">(${project.tool})</p>
                <br />
                <p>{about}</p>
                <br />
                <a
                  class="project-link"
                  href="{link}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Show More</span>
                </a>
              </div>
  `;

  return projectList.appendChild(oneProject);
});

// SKILLS
const skillsBadges = document.querySelector(".skills-badges");

skills.map((skill, index) => {
  const badge = document.createElement("article");
  badge.className = `badge skill${index}`;
  badge.innerHTML = `
  <div class="badge-img">
    <img src=${skill.image} alt=${skill.name.replace(/\s/g, "")} />
  </div>
  <h4 class="badge-name">${skill.name}</h4>
  `;

  badge.addEventListener("click", () => window.open(skill.url));
  skill.url ? badge.setAttribute("style", "cursor:pointer") : badge;

  return skillsBadges.appendChild(badge);
});
