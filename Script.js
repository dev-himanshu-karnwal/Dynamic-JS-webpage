'use strict';


////////SELECTIONG HTML ELEMENTS////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const heading = document.querySelector('h1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('img[data-src]');
const allSlides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

////////////////////////////////////////////////


///////////////////////////////////////////////
//////////MODAL WINDOW OF OPEN ACCOUNT/////////
///////////////////////////////////////////////

// Function to open modal window
const openModal = function (e) {
    console.log(e);
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

// Function to close modal window
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// Event Listener to open modal window
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Event Listeners to close modal window on 1. Esc key press, 2. close button press & 3. click outside
btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


/////////////////////////////////////////////////


/////////////////////////////////////////////////
///////////////DISPLAY COOKIE MESSAGE////////////
/////////////////////////////////////////////////


// Creating a div element to show message
const message = document.createElement('div');

// add cookie class to add css in it
message.classList.add('cookie');

// Fill out contents in it
message.innerHTML =
    'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Addtional Styling
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// Increase height by 10 pixel 
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 10 + 'px';

// Add element to HTML
document.querySelector('#section--1').before(message);

// event listener to remove the message from html when button(Got it!) is clicked
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    // Function to remove element from html
    message.remove();
})

////////////////////////////////////////////////


////////////////////////////////////////////////
/////////////// SMOOTH SCROLLINGS //////////////
////////////////////////////////////////////////

//////////////////////////////////////////////////
// when learn more button is clicked then scroll to section - 1 

// Event listener & callback function to do so
btnScrollTo.addEventListener('click', function (e) {

    /* getBoundingClientRect() returns the current position of element just before the event perform :::--
    1. left: distance b/w element and current viewPort left boundry,
    
    2. right: distance b/w element and current viewPort right boundry,
    
    3. top: distance b/w element and current viewPort top boundry, 
    
    4. bottom: distance b/w element and current viewPort bottom boundry,
    
    5. height: total height of element
    
    6. width: total width of element
    
    7. x: same as left, 
    
    8. y: same as top */

    // const btnCoords = btnScrollTo.getBoundingClientRect();
    // console.log(btnCoords);

    // const s1coords = section1.getBoundingClientRect();
    // console.log(s1coords);

    // console.log(e.target.getBoundingClientRect());

    // // window.pageXOffset returns the distance or difference b/w the top/left of page and top/left of current viewPort 
    // console.log(`Current Scroll (X/Y): ${window.pageXOffset} ${window.pageYOffset}`);

    // // document.documentElement.clientWidth/clientHeight returns the current height and width of viewport
    // console.log(`Current ViewPort: ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`);

    // Scrollling (old method)

    // // 1. window.scrollTo(x, y) performs the the page to scroll by x, y pixels (y default 0)
    // window.scrollTo(s1coords.left, s1coords.top);
    // // 2. these two were added as (current postion of element + amount of scroll done till now) as scrll (if any) has made the inverse change in current position so both added gives actual parameter needed
    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
    // // 3. Implement smooth scroll by passing object of left, top, and smooth behaviour
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });
    // console.log(`Current Scroll (X/Y): ${window.pageXOffset} ${window.pageYOffset}`);

    // Scrollling (new method)
    section1.scrollIntoView({ behavior: 'smooth' });

});

//////////////////////////////////////////////

//////////////////////////////////////////////
// When items on navigaton bar is clicked


// // Simple Approach: get node list of all items on navbar and add event listeners to all in a loop(forEach)
// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();

// //     get id of section to which scroll has to be made  
//     const id = this.getAttribute('href');
//     console.log(id);
// //     scroll
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })


// Optimised approach: select the parent element of all items on navbar...here the ul list....thenn add click eventListener on it and get the element where event happened ....if that was a item then  scroll else skip
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    // If that event happened on a item 
    if (e.target.classList.contains('nav__link')) {

        // Get id of section to which scroll is to be made
        const id = e.target.getAttribute('href');

        // Scroll
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
})


/////////////////////////////////////////////

////////////////////////////////////////////////
/////////////// TABBED COMPONENT //////////////
////////////////////////////////////////////////

//////////////////////////////////////////////

// Event handler attached to tab-container(parent elemrnt of all three tabs) to implement tabbed component
tabsContainer.addEventListener('click', function (e) {

    // get which tab was clicked
    const clicked = e.target.closest('.operations__tab');

    // If clicked outside tab but in tab-container then return
    if (!clicked) return;

    // Activate clicked tab
    tabs.forEach((t) => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');


    // Show clicked tab content
    tabsContent.forEach((t) => t.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

//////////////////////////////////////////////

////////////////////////////////////////////////
//////////////MENU FADE ANIMATION///////////////
////////////////////////////////////////////////

//////////////////////////////////////////////


// Function to handle mouse over & mouse out events as per passed arguments
const fadeAnimation = function (e) {
    // item on  which mouse hovered / mouse-outed
    const hovered = e.target

    // checks if item was actually a nav_link item not the nav bar or logo
    if (hovered.classList.contains('nav__link')) {

        // Select all navbar items 
        const allItems = hovered.closest('.nav').querySelectorAll('.nav__link');
        // Select logo
        const logo = hovered.closest('.nav').querySelector('img');

        // forEach on allItems to reduce/back opacity of other items and logo on navbar
        allItems.forEach((itm) => {
            if (itm !== hovered) itm.style.opacity = this;
        })
        logo.style.opacity = this;
    }
}

// Event Listener on navbar to add mouse over event on all items on navbar
nav.addEventListener('mouseover', fadeAnimation.bind(0.5));

// Event Listener on navbar to add mouse out event on all items on navbar ie remove back fade animation
nav.addEventListener('mouseout', fadeAnimation.bind(1));

//////////////////////////////////////////////


////////////////////////////////////////////////
///////////////STICKY NAVIGATION////////////////
////////////////////////////////////////////////

//////////////////////////////////////////////

// // Bad approach
// window.addEventListener('scroll', function () {
//   const initialCoords = section1.getBoundingClientRect();

//   console.log(initialCoords, window.scrollY);

//   if (initialCoords.top < window.scrollY)
//     nav.classList.add('sticky');
//   else
//     nav.classList.remove('sticky');

// })

////////////////////////////////////////////////

// Better Approach: using Intersection Observer API 

// CallBack function to be executed on intersection of observer with root at given threshold
// entris is array of scroll Intersection Observer events 
const obsCallback = function (entries) {
    const [entry] = entries;

    // isIntersecting is true when atleast (can be more) given threshold of target iis on root
    if (entry.isIntersecting)
        nav.classList.remove('sticky');
    else
        nav.classList.add('sticky');

}

const navHeight = nav.getBoundingClientRect().height;
// options object : passed to    construcor having options on what to observe 
const obsOptions = {
    // root is element or place on which target is to inserted, null is used to observe with current viewport
    root: null,
    // threshold is the percentage (0 to 1) representing how much target should be visible on root the callback is executed, 0 means when no part of target is visible then call callback
    threshold: 0,
    // rootmargin is extra space in addtiton to threshold (in px)  
    rootMargin: `-${navHeight}px`,
};

// creating a new IntersectionObserver object 
const observer = new IntersectionObserver(obsCallback, obsOptions);
// header is the target ie header is to be observed while scrolling
observer.observe(header);


//////////////////////////////////////////////


////////////////////////////////////////////////
/////////////////REVEAL SECTON//////////////////
////////////////////////////////////////////////

//////////////////////////////////////////////

// callback to reveal when neww section is scrolled up

const revealCallBack = function (entries, observer) {

    const [entry] = entries;

    // if threshold of target is visible on root
    if (entry.isIntersecting) {

        // remove hidden class ie unhide section
        entry.target.classList.remove('section--hidden');
        // unobserve that section as it has been unhidden now so that no more observation is keep up on this
        observer.unobserve(entry.target);
    }

}

// options object : passed to IntersectionObserver construcor having options on what to observe 
const revealOptions = {
    // root is element or place on which target is to inserted, null is used to observe with current viewport
    root: null,
    // threshold is the percentage (0 to 1) representing how much target should be visible on root the callback is executed, 0.15 means when 15% part of target is visible then call callback
    threshold: 0.15,

};

// creating a new IntersectionObserver object 
const sectionObserver = new IntersectionObserver(revealCallBack, revealOptions);
// allSections is a node list of nodes of all 4 sections
// start forEach to add hidden class initially on all sections and start observer
allSections.forEach(section => {
    section.classList.add('section--hidden');

    sectionObserver.observe(section);
});

//////////////////////////////////////////////


////////////////////////////////////////////////
///////////////LAZY LOAD IMAGES/////////////////
////////////////////////////////////////////////

//////////////////////////////////////////////


// callback to lazy load images when scrolled up
const lazyImgCallBack = function (entries, observer) {
    const [entry] = entries;


    // if threshold of target is visible on root
    if (entry.isIntersecting) {

        // change the low quality imagr to high one
        entry.target.src = entry.target.dataset.src;

        // remove lazy image class when completely loaded 
        entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));

        // unobserve that image as it has been loaded now so that no more observation is keep up on this
        observer.unobserve(entry.target);
    }
}

// creating a new IntersectionObserver object  
const imgObserver = new IntersectionObserver(lazyImgCallBack, {
    root: null,
    threshold: 0
});

// lazyImages is a node list of nodes of all 3 images
// start forEach to start observer on each image
lazyImages.forEach(img => imgObserver.observe(img))


//////////////////////////////////////////////


////////////////////////////////////////////////
///////////////SLIDER COMPONENT/////////////////
////////////////////////////////////////////////

//////////////////////////////////////////////

// holds currently which slide is active
let currentSlide = 0;

// Function to create dots in HTML for slides
const createDots = function (all) {

    // loop to insert dot for each slide in html
    all.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    })

    // return the node list of all element of dots 
    return document.querySelectorAll('.dots__dot');
}

// Function invoke to create dots for allSlides and return its node list 
const allDots = createDots(allSlides);


// Function to move to slide no received 
const goToSlide = function (no) {

    // lop to change slide
    allSlides.forEach(function (slide, i) {
        // transform property incresed / decreased as per left/ right mocvement 
        slide.style.transform = `translateX(${(i - no) * 100}%)`;
        // remove active dot class from all dots
        allDots[i].classList.remove('dots__dot--active');
    });
    // add active dot class to active dot
    allDots[no].classList.add('dots__dot--active');
}


// Function to move slider to next slide 
const nextSlide = function () {
    // If already at last slide then go to first slide
    if (currentSlide === allSlides.length - 1)
        currentSlide = 0;
    // else move to next slide 
    else
        currentSlide++;

    // change slide as per new currentSlide number
    goToSlide(currentSlide);
}

// Function to move slider to previous slide 
const lastSlide = function () {
    // If already at first slide then go to last slide
    if (currentSlide === 0)
        currentSlide = allSlides.length - 1;
    // else move to previous slide 
    else
        currentSlide--;

    // change slide as per new currentSlide number
    goToSlide(currentSlide);
}

// Intialize slider to show first slide 
goToSlide(0);


// Event listener to change slides as per arrow jeys on screen present pressed
document.querySelector('.slider__btn--left').addEventListener('click', lastSlide);
document.querySelector('.slider__btn--right').addEventListener('click', nextSlide);


// Event listeenrs to change slides also as per keyboard arrow keys pressed (left and right)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') lastSlide();
})


// Event listener to change slide on basis of dots on screen pressed
dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        goToSlide(+e.target.dataset.slide);
    }
})

//////////////////////////////////////////////


//////////////////////////////////////////////




//////////////////////////////////////////////

//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////PRACTICES////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('DOM loaded', e);
// })

// window.addEventListener('load', function (e) {
//   console.log('FULLY loaded', e);
// })

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ' ';
// })


// console.log(document);
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// console.log(document.querySelector('div'));

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// const divs = document.createElement('div');
// divs.classList.add('cookie-message');
// divs.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// console.log(divs);

// document.querySelector('.header').prepend(divs);
// message.textContent = 'We use cookied for improved functionality and analytics.';

// header.prepend(message);

// const l = document.createElement('li');
// const lst = document.querySelector('.nav__links');

// l.innerHTML = `<a class="nav__link" href="#">xx</a>`
// l.classList.add('nav__item');

// console.log(l);

// lst.prepend(l);
// const s = document.querySelector('#section--1');

////////MOUSE ENTER EVENT(like hover)/////////

// const alertH1 = function (e) {
//   alert('Ammmm Hmmmm Heading pdra londa');
// }

// heading.addEventListener('mouseenter', alertH1);

// setTimeout(() => heading.removeEventListener('mouseenter', alertH1), 5000);

/////////////////////////////////////////////

///////////Event Propagation:BUBBLING//////////
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
    console.log('nav_link', e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();


    // To stop event propagation
    e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    console.log('nav_links', e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();
}, true);

document.querySelector('.nav').addEventListener('click', function (e) {
    console.log('nav', e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();
});


/////////////////////////////////////////////
// message.style = `display: flex;
//   align - items: center;
//   justify - content: space - evenly;
//   width: 100 %;
//   background - color: white;
//   color: #bbb;
//   font - size: 1.5rem;
//   font - weight: 400;`;



// console.log(message.style.display);
// console.log(getComputedStyle(message).color);

// const a = document.querySelector('.cookie')
// const cookieCls = document.querySelector('.btn--close-cookie');


// document.documentElement.style.setProperty('--color-primary', 'orangered');


// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);

// // // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');
// console.log(logo);
// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);


//DOM TRAVERSAL
//downways
// console.log(heading.querySelectorAll('.highlight'));
// console.log(heading.childNodes);
// console.log(heading.children);

// heading.firstElementChild.style.color = 'white';
// heading.lastElementChild.style.color = 'black';

// //upways
// console.log(heading.parentNode);
// console.log(heading.parentElement);

// heading.closest('.header').style.backgroundColor = 'cyan';

// //side ways
// console.log(heading.previousElementSibling);
// console.log(heading.nextElementSibling);

// console.log(heading.parentElement.children);