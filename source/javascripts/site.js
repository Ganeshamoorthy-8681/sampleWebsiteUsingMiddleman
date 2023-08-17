//Variables
const currentPathName = window.location.pathname.split('/')[1];
const navLinkList = document.querySelectorAll(".nav-link");
const sectionList = document.querySelectorAll('.page__section');
const linkList = document.querySelectorAll(".page__navigation__link");
const themeSwitch = document.getElementById("theme-switch");
let currentSection;

//Active page indication on the header page
for (let link of navLinkList) {
    if (link.href.includes(currentPathName)) {
        link.classList.add('active');
        break;
    }
}

//Dark theme switch
window.onload = () => {
    let theme = localStorage.getItem("theme");
    if (theme == "dark") {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.add("light-theme");
        localStorage.setItem("theme","light");
    }
}

themeSwitch.addEventListener("click", () => {

    let theme = localStorage.getItem("theme");
    if (theme == "dark") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    }
})

//Section  indication on the home page
const headerHeight = document.querySelector('header').clientHeight;
document.addEventListener("scroll", () => {
    sectionList.forEach(section => {
        if (window.scrollY >= (section.offsetTop - headerHeight))
            currentSection = section.getAttribute("id");
    });

    linkList.forEach(link => {
        if (link.href.includes(currentSection))
            link.classList.add('page-active');
        else
            link.classList.remove('page-active');
    })
})

//Custom scrolling  when the link is clicked on the home page
linkList.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition
            });
        }
    })
})

//Stepper implementation in basci page
if (window.location.href.includes("basic")) {
    const steps = document.querySelectorAll('.step');
    const indicator = document.getElementById('indicator');
    const stepContentSection = document.querySelectorAll('.step-content');
    const stepsActive = document.getElementsByClassName('step-active');
    let isAnimateForward;
    let stepCount = 0;
    let currentStepIndex;

    //Steps will change for every 3 seconds
    setInterval(() => {
        updateprogressAndStepIndicator();
        updateContentBasedOnStep();
    }, 300)

    // Function to update the progress of  steps
    function updateprogressAndStepIndicator() {

        let indicatorLength = isNaN(parseInt(indicator.style.width)) ? 0 : parseInt(indicator.style.width);

        if (indicatorLength == 0) {
            isAnimateForward = true;
        }
        if (indicatorLength == 99) {
            isAnimateForward = false;
        }
        if (isAnimateForward) {
            indicator.style.width = `${indicatorLength + 33}%`;
            stepCount++;
            steps[stepCount].classList.add("step-active");
        }
        else {
            indicator.style.width = `${indicatorLength - 33}%`;
            steps[stepCount].classList.remove('step-active');
            stepCount--;
        }
        // UpdateCurrentStepIndex to get the data of that step
        currentStepIndex = (stepsActive.length - 1);
    }

    // Update the content based on current step
    function updateContentBasedOnStep() {
        stepContentSection.forEach((section) => {
            section.classList.remove("active");
        })
        stepContentSection[currentStepIndex].classList.add('active');
    }
}
