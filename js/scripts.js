(function () {

    // Init variables
    var navOpen = false;
    var pageNav = document.querySelector('.page-nav');
    var navEl = document.querySelector('.page-nav nav');
    var navLinks = document.querySelectorAll('.page-nav nav a');
    var arrowLeft = document.querySelector('.nav-arrow-left');
    var arrowRight = document.querySelector('.nav-arrow-right');
    var navHeight = 40;
    var activeIndex, activeDistance, activeItem, navAnimation, navItemsAnimation;

    // Helper function to get the index of `item`
    function getIndex(item) {
        return Array.prototype.indexOf.call(item.parentNode.children, item);
    }

    // This translate the nav element to show the selected item
    function translateNav(item) {
        // If animation is defined, pause it
        if (navItemsAnimation) navItemsAnimation.pause();
        // Animate the `translateY` of `nav` to show only the current link
        navItemsAnimation = anime({
            targets: navEl,
            translateY: (item ? -activeIndex * navHeight : 0) + 'px',
            easing: 'easeOutCubic',
            duration: 500
        });
        // Update link on arrows, and disable/enable accordingly if first or last link
        updateArrows();
    }

    // Update link on arrows, and disable/enable accordingly if first or last link
    function updateArrows() {
        if (activeIndex === 0) {
            arrowLeft.classList.add('nav-arrow-disabled');
            arrowLeft.removeAttribute('href');
            arrowLeft.removeAttribute('data-scroll');
        } else {
            arrowLeft.classList.remove('nav-arrow-disabled');
            arrowLeft.setAttribute('href', navLinks[activeIndex - 1].href);
            arrowLeft.setAttribute('data-scroll', "");
        }

        if (activeIndex === navLinks.length - 1) {
            arrowRight.classList.add('nav-arrow-disabled');
            arrowRight.removeAttribute('href');
            arrowRight.removeAttribute('data-scroll');
        } else {
            arrowRight.classList.remove('nav-arrow-disabled');
            arrowRight.setAttribute('href', navLinks[activeIndex + 1].href);
            arrowRight.setAttribute('data-scroll', "");
        }
    }

    // Open the nav, showing all the links
    function openNav() {
        // Updating states
        navOpen = !navOpen;
        pageNav.classList.add('nav-open');
        // Moving the nav just like first link is active
        translateNav();
        // Animate the `height` of the nav, letting see all the links
        navAnimation = anime({
            targets: pageNav,
            height: navLinks.length * navHeight + 'px',
            easing: 'easeOutCubic',
            duration: 500
        });
    }

    // Close the nav, also showing the selected link
    function closeNav() {
        // Updating states
        navOpen = !navOpen;
        pageNav.classList.remove('nav-open');
        // Moving the nav showing only the active link
        translateNav(activeItem);
        // Animate the `height` of the nav, letting see just the active link
        navAnimation = anime({
            targets: pageNav,
            height: navHeight + 'px',
            easing: 'easeOutCubic',
            duration: 500
        });
    }

    // Init click events for each nav link
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function (e) {
            if (navOpen) {
                // Just close the `nav`
                closeNav();
            } else {
                // Prevent scrolling to the active link and instead open the `nav`
                e.preventDefault();
                e.stopPropagation();
                openNav();
            }
        });
    }

    // Detect click outside, and close the `nav`
    // From: http://stackoverflow.com/a/28432139/4908989
    document.addEventListener('click', function (e) {
        if (navOpen) {
            var isClickInside = pageNav.contains(e.target);
            if (!isClickInside) {
                closeNav();
            }
        }
    });

    // Init Smooth Scroll
    smoothScroll.init({
        // This `offset` is the `height` of fixed header
        offset: -80
    });

    // Init Gumshoe
    gumshoe.init({
        // The callback is triggered after setting the active link, to show it as active in the `nav`
        callback: function (nav) {
            // Check if active link has changed
            if (activeDistance !== nav.distance) {
                // Update states
                activeDistance = nav.distance;
                activeItem = nav.nav;
                activeIndex = getIndex(activeItem);
                // Translate `nav` to show the active link, or close it
                if (navOpen) {
                    closeNav();
                } else {
                    translateNav(activeItem);
                }
            }
        }
    });

})();
