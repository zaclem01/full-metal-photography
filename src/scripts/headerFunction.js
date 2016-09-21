import $ from 'jquery';

export default function() {
    $('.topBar_menuBtn').click(function(event) {
        event.stopPropagation();
        console.log('menu click')
        $('.sidebarWrapper').addClass('visible');
    });

    // $('.sidebar_closeBtn').click(function() {
    //     $('.sidebarWrapper').removeClass('visible');
    // });

    $('body > *').not('.sidebarWrapper, .topBar_menuBtn').click(function(event) {
        event.stopPropagation();
        console.log($(this))
        console.log('elsewhere click')
        if ($('.sidebarWrapper').hasClass('visible')) {
            console.log('remove')
            $('.sidebarWrapper').removeClass('visible');
        }
    })
}