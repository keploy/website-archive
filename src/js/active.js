const imagesLoaded = require('imagesloaded');
var jQueryBridget = require('jquery-bridget');

const isotope = require('isotope-layout');

$.fn.imagesLoaded = imagesLoaded;
// $.fn.isotope = function(opts) {
//     this.each(function() {
//         if (!$(this).data('isotope')) {
//             $(this).data('isotope', new isotope(this, opts));
//         }
//     });
//     return this;
// };

jQueryBridget( 'isotope', isotope, $ );


(function ($) {
    'use strict';
    if ($.fn.imagesLoaded) {
        // console.log("images loaded")
        
        // if ($('.alime-portfolio').length) {
        //     console.log("Elements with class 'alime-portfolio' exist", $('.alime-portfolio').length);
        // } else {
        //     console.log("No elements with class 'alime-portfolio' found");
        // }

        imagesLoaded( $('.alime-portfolio'), function() {
            // console.log("alime-portfolio images loaded")
            // filter items on button click
            $('.portfolio-menu').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
                // console.log("updating isotope filter to: " + filterValue)
            });
            // init Isotope
            var $grid = $('.alime-portfolio').isotope({
                itemSelector: '.single_gallery_item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.single_gallery_item'
                }
            });
            var inititalFilterValue = $('.btn.active').attr('data-filter');
            $grid.isotope({
                filter: inititalFilterValue
            })
        })

        
    }




    // ***********************************
    // :: 6.0 Portfolio Button Active Code
    // ***********************************

    $('.portfolio-menu button.btn').on('click', function () {
        $('.portfolio-menu button.btn').removeClass('active');
        $(this).addClass('active');
    })

    // ********************************
    // :: 7.0 Search Button Active Code
    // ********************************
    $('.search-btn').on('click', function () {
        $('.search-form').toggleClass('search-form-active');
    })

    // ************************
    // :: 8.0 Stick Active Code
    // ************************

    // alime_window.on('scroll', function () {
    //     if (alime_window.scrollTop() > 0) {
    //         $('.main-header-area').addClass('sticky');
    //     } else {
    //         $('.main-header-area').removeClass('sticky');
    //     }
    // });
})(jQuery);

// console.log("active.js loaded and the loaded jquery plugins are: " + Object.keys(jQuery.fn))