/* global Swiper */

'use strict';

$(document).ready(function () {

  // Mobile-menu ----------------
  function initMobMenu() {
    var btn = $('#mob-menu');

    btn.on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.siblings('#menu').
      toggleClass('active').
      end().
      toggleClass('active');
    });
  }
  initMobMenu();

  // Scroll down ---------------
  function scrollDown() {
    var btn = $('#btn-down');

    btn.on('click', function () {
      var scrollTo = $('#section-main').position().top;

      $('body, html').stop().animate({
        scrollTop: scrollTo },
      500);
      return false;
    });
  }
  scrollDown();
/*
  // Slider init ----------------
  function initSlider() {
    var wrap = $('#cards');

    new Swiper(wrap, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev' },

      // loop: true
      // autoplay: {
      // 	delay: 3500,
      // 	disableOnInteraction: false
      // }
    });
  }
  initSlider();
 */

  // Slider recipes init ----------------
  function initRecipesSlider() {
    var wrap = $('.recipes__mobile');

    new Swiper(wrap, {
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev' 
      },
      loop: false
    });
  }
  if(window.innerWidth < 769) {
    initRecipesSlider();
  }

  // Popup------------------
  function openPopUp() {
    $('.js-popup-button').on('click', function (e) {
      e.preventDefault();
      $('.popup').removeClass('js-popup-show');
      $('#helper').removeClass('blur');
      var popupClass = '.' + $(this).attr('data-popupShow');
      $(popupClass).addClass('js-popup-show');
      $('#helper').addClass('blur');
      if ($(document).height() > $(window).height()) {
        var scrollTop = $('html').scrollTop() ? $('html').scrollTop() : $('body').scrollTop();
        $('html').addClass('noscroll').css('top', -scrollTop);
      }
    });
    closePopup();
  }

  // Close PopUp-----------------
  function closePopup() {
    $('.js-close-popup').on('click', function (e) {
      e.preventDefault();
      $('.popup').removeClass('js-popup-show');
      $('#helper').removeClass('blur');
      var scrollTop = parseInt($('html').css('top'));
      $('html').removeClass('noscroll');
      $('html, body').scrollTop(-scrollTop);
    });
  }
  openPopUp();

  function openAccordion() {
      var wrap = $('.section-main__item_product').not('.not-click');
      var accordion = wrap.find('.section-main__inner_product');

      accordion.on('click', function () {
        var $this = $(this);
        var $parent = $(this).parent();
        var content = $this.next();
        var content_height = content.innerHeight() + 20;

        accordion.not($this).removeClass('active');
        accordion.not($this).next().hide();
        accordion.not($this).parent().css('margin-bottom',0);

        if (content.is(':visible')) {
          $this.removeClass('active');
          $parent.removeClass('active');
          content.slideUp('fast');
          $parent.animate({
            'margin-bottom': 0
          }, 300);
        } else {
          $this.addClass('active');
          $parent.addClass('active');
          content.slideDown('fast');
          $parent.animate({
            'margin-bottom': content_height
          }, 300);
        }

      });

      $('.close-accordion').click(function(e) {
        e.preventDefault();

        $(this).parents('.section-main__item_product').find('.section-main__inner_product').removeClass('active');
        $(this).parents('.section-main__item_product').removeClass('active');
        $(this).parents('.product-detail-block').slideUp('fast');
        $(this).parents('.section-main__item_product').animate({
          'margin-bottom': 0
        }, 300);
      });
  }
  openAccordion();

  function openAccordionMore() {
        var accordion = $('.recipes-more-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.prev();

          if (content.is(':visible')) {
            $this.text('Узнайте больше про OREO Крошка и Порошок');
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.text('Свернуть');
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordionMore();
});

( function() {

    var youtube = document.querySelectorAll( ".youtube" );
    
    for (var i = 0; i < youtube.length; i++) {
        
        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";
        
        var image = new Image();
            image.src = source;
            image.addEventListener( "load", function() {
                youtube[ i ].appendChild( image );
            }( i ) );
    
            youtube[i].addEventListener( "click", function() {

                var iframe = document.createElement( "iframe" );

                    iframe.setAttribute( "frameborder", "0" );
                    iframe.setAttribute( "allowfullscreen", "" );
                    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1&enablejsapi=1" );

                    this.innerHTML = "";
                    this.appendChild( iframe );
            } );    
    };
    
} )();