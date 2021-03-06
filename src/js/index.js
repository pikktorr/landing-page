import { projects } from "./lists";
import { gallery } from "./lists";
import { skills } from "./lists";

/* PAGE EVENTS */

window.addEventListener("orientationchange", () => location.reload());

//NAVIGATION - BACK TO TOP
const topButton = document.querySelector(".back-to-top");
const scrollFunction = () => {
  document.body.scrollTop > 600 || document.documentElement.scrollTop > 600
    ? (topButton.style.visibility = "visible")
    : (topButton.style.visibility = "hidden");
};
window.onscroll = () => scrollFunction();
topButton.onclick = () => window.scrollTo(0, 0);

// MOBILE MENU
const navContainer = document.querySelector(".nav-container");
const navBackground = document.querySelector(".nav-background");
const menu = document.querySelector(".nav-menu");
const navCloseButton = document.querySelector(".menu-close");
const heroLogo = document.querySelector(".bg-logo");

const openMenu = () => {
  navContainer.style.display = "grid";
  setTimeout(() => {
    navBackground.classList.add("menu-open");
  }, 10);
  setTimeout(() => {
    heroLogo.style.display = "none";
  }, 100);
  setTimeout(() => {
    menu.style.display = "flex";
  }, 300);
};

const closeMenu = () => {
  menu.style.display = "none";
  navBackground.classList.remove("menu-open");
  setTimeout(() => {
    heroLogo.style.display = "flex";
  }, 200);
  setTimeout(() => {
    navContainer.style.display = "none";
  }, 300);
};

heroLogo.addEventListener("click", () => {
  if (window.innerWidth < window.innerHeight) openMenu();
});
navCloseButton.addEventListener("click", () => closeMenu());

// NAVIGATION - SCROLL
const scrollPage = (targetId) => {
  const target = document.querySelector(targetId);
  const targetLeftPosition = target.getBoundingClientRect().left;
  const targetTopPosition = target.getBoundingClientRect().top;
  window.scrollTo(targetLeftPosition, targetTopPosition);
};

const navToSections = [
  { nav: "#nav-home", section: "#home-section" },
  { nav: "#nav-about", section: "#about-section" },
  { nav: "#nav-projects", section: "#projects-section" },
  { nav: "#nav-slide", section: "#slide-section" },
  { nav: "#nav-skills", section: "#skills-section" },
  { nav: "#nav-contact", section: "#contact-section" },
];

navToSections.map((element) => {
  const navButton = document.querySelector(element.nav);
  navButton.addEventListener("click", () => {
    scrollPage(element.section);
    if (window.innerWidth < window.innerHeight) closeMenu();
  });
});

// PROJECTS
const projectList = document.querySelector(".projectList");
projects.map((project) => {
  const oneProject = document.createElement("article");
  oneProject.className = "project-container";
  oneProject.innerHTML = `
    <div class="project-image">
      <img src=${project.image}  alt=${project.title.replace(/\s/g, "")} />
      </div>
      <div class="project-text">
        <h2 class="project-title">${project.title}</h2>
        <p class="project-tool">(${project.tool})</p>
        <hr />
        <p>${project.about}</p>
      </div>
  `;
  oneProject.addEventListener("click", () =>
    window.open(project.link, "_blank", "noopener")
  );
  return projectList.appendChild(oneProject);
});

// AUTOMATIC SLIDESHOW
let slideIndex = 0;
const slides = document.querySelectorAll(".slide-container>img");
const dots = document.querySelectorAll(".dot");

const showSlides = () => {
  slides.forEach((slide, index) => {
    slide.classList.add("hidden-img");
  });
  slideIndex >= slides.length ? (slideIndex = 0) : slideIndex;
  slides.forEach((img) => img.classList.remove("active-img"));
  slides[slideIndex].classList.replace("hidden-img", "active-img");

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");

  slideIndex++;
  setTimeout(showSlides, 4000);
};
showSlides();

slides.forEach((slide, index) =>
  slide.addEventListener("click", () => {
    showModal();
    switch (index) {
      case 0:
        currentImage(0);
        break;
      case 1:
        currentImage(1);
        break;
      case 2:
        currentImage(6);
        break;
      case 3:
        currentImage(11);
        break;
      case 4:
        currentImage(16);
        break;
      default:
        currentImage(0);
    }
  })
);

//GALLERY
const galleryContainer = document.querySelector(".gallery-content");
const modal = document.querySelector(".modal-container");
const closeButton = document.querySelector(".close-button");
const prevImg = document.querySelector(".prev-img");
const nextImg = document.querySelector(".next-img");
let galleryIndex = 0;

const images = gallery.map((img, index) => {
  const image = document.createElement("div");
  image.className = "gallery-image active-img";
  image.innerHTML = `
  <img src=${img.image}>
  <div class="img-caption">
    <p>${index + 1}/${gallery.length}</p>
    <h3 class="img-title">${img.title}</h3>
    <p>${img.about}</p>
    </div>
    `;
  return image;
});

const showModal = () => {
  modal.style.display = "block";
  document.body.style.overflowY = "hidden";
  // fixedBody();
};

const closeModal = () => {
  modal.style.display = "none";
  images.map((img) => img.remove());
  document.body.style.overflowY = "";
};

const currentImage = (n) => {
  showImage((galleryIndex = n));
};

const showImage = (n) => {
  images.map((img) => img.remove());

  if (n >= images.length) {
    galleryIndex = 0;
  }
  if (n < 0) {
    galleryIndex = images.length - 1;
  }
  galleryContainer.appendChild(images[galleryIndex]);
};

const plusImages = (n) => {
  showImage((galleryIndex += n));
};

nextImg.addEventListener("click", () => plusImages(1));
document.addEventListener("keydown", (event) => {
  if (event.which === 39 && modal.style.display === "block") plusImages(1);
});

prevImg.addEventListener("click", () => plusImages(-1));
document.addEventListener("keydown", (event) => {
  if (event.which === 37 && modal.style.display === "block") plusImages(-1);
});

closeButton.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.which === 27 && modal.style.display === "block") closeModal();
});

// SKILLS
const skillsBadges = document.querySelector(".skills-badges");

skills.map((skill, index) => {
  const badge = document.createElement("article");
  badge.className = `badge skill${index}`;
  badge.innerHTML = `
  <div class="badge-img" title=${skill.name.replace(/\s/g, "")}>
    <img src=${skill.image}  alt=${skill.name.replace(/\s/g, "")} />
  </div>
  `;
  return skillsBadges.appendChild(badge);
});

const email = document.querySelector(".email");
const github = document.querySelector(".github");
const linkedin = document.querySelector(".linkedin");
const twitter = document.querySelector(".twitter");
const instagram = document.querySelector(".instagram");

const openLink = (name, url) => {
  name.addEventListener("click", () => {
    window.open(url, "_blank", "noopener");
  });
};

openLink(email, "mailto:viktor.rozgonyi@gmail.com");
openLink(github, "https://github.com/pikktorr");
openLink(linkedin, "https://www.linkedin.com/in/viktor-rozgonyi/");
openLink(twitter, "https://twitter.com/pikktorr");
openLink(instagram, "https://www.instagram.com/pikktorr/");
