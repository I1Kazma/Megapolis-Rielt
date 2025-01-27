let nav__toggle = document.querySelector("#nav__toggle");
let nav__open = document.querySelector("#nav__open");
let nav__close = document.querySelector("#nav__close");

nav__open.onclick = () => {
    nav__toggle.classList.toggle("nav__toggle");
    document.body.classList.toggle("nav--opened")
};

nav__close.onclick = () => {
    nav__toggle.classList.remove("nav__toggle");
    document.body.classList.remove("nav--opened")
};

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 100);
});

let tabs = document.querySelectorAll('.objects__item'),
    tabsImg = document.querySelectorAll('.objects__img'),
    tabsContent = document.querySelectorAll('.objects__content'),
    tabsParent = document.querySelector('.objects__header');


const hideTabContent = () => {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('item-active');
    });
}

const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('item-active');
}


const tabsParentFunction = () => {
    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && (target.classList.contains('objects__item') || target.classList.contains('objects__img'))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

if (tabs) {
    hideTabContent();
    showTabContent();
    tabsParentFunction();
}