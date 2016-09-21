import $ from 'jquery';

export default function() {
    const $sidebar = $('.sidebarWrapper');

    // Open sidebar menu when clicked
    $('.js-menuBtn').click(function(event) {
        event.stopPropagation(); // Stop bubbling to upper DOM elements
        $sidebar.addClass('js-visible');
    });

    // Close sidebar menu when anywhere but menu is clicked
    $('body > *').not('.sidebarWrapper, .topBar_menuBtn').click(function(event) {
        event.stopPropagation(); // Stop bubbling to upper DOM elements
        if ($sidebar.hasClass('js-visible')) {
            $sidebar.removeClass('js-visible');
        }
        // Close the sub menus when sidebar is closed
        if ($('.js-subMenu').children('.nav_item_subMenu').hasClass('js-visible')) {
            $('.js-subMenu').click();
        }
    });

    // Open submenus
    $('.js-subMenu').click(function() {
        const $subMenu = $(this).children('.nav_item_subMenu');
        $(this).children('a').children('i').toggleClass('fa-flip-vertical');
        $subMenu.toggleClass('js-hidden');
        $subMenu.toggleClass('js-visible');
    });
}