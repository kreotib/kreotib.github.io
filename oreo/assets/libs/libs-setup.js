// Scrollbar
jQuery(document).ready(function(){
  jQuery('.scrollbar-inner').scrollbar();

  $('.anchor[href^="#"]').click(function () {
      if($(window).innerWidth() <= 1280) {
         $('.header__nav').removeClass('show-nav');
      }
      elementClick = $(this).attr("href");
      destination = $(elementClick).offset().top;
      $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
      return false;
  });
});

$(window).on('scroll load', function () {
    if(window.innerWidth <= 768) {
      var top = $(window).scrollTop();
      if(top >= 100) {
          $('header').removeClass('scroll');
          $('header').addClass('scroll');
      } else {
          $('header').addClass('scroll');
          $('header').removeClass('scroll');
      }
    }
});

// Popup
function OpenPopup(popupId) {
  $('body').removeClass('no-scrolling');
  $('.popup').removeClass('js-popup-show');
  popupId = '#' + popupId;
  $(popupId).addClass('js-popup-show');
  $('body').addClass('no-scrolling');
}

$('.pop-op').click(function (e) {
  e.preventDefault();
  let data = $(this).data('popup');
  OpenPopup(data);
});

function closePopup() {
  $('.js-close-popup').on('click', function (e) {
    e.preventDefault();
    $('.popup').removeClass('js-popup-show');
    $('body').removeClass('no-scrolling');
  });
}

closePopup();

function clickClosePopup(popupId) {
  popupId = '#' + popupId;
  $(popupId).removeClass('js-popup-show');
  $('body').removeClass('no-scrolling');
}

// Validate
function checkValidate() {
  var form = $('form');

  $.each(form, function () {
    $(this).validate({
      ignore: [],
      errorClass: 'error',
      validClass: 'success',
      rules: {
        name: {
          required: true
        },
        code: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true,
          phone: true
        },
        message: {
          required: true
        },
        password: {
          required: true,
          normalizer: function normalizer(value) {
            return $.trim(value);
          }
        }
      },
      errorElement: 'span',
      errorPlacement: function(error, element) {
        var placement = $(element).data('error');
        if (placement) {
          $(placement).append(error);
        } else {
          error.insertBefore(element);
        }
      },
      messages: {
        phone: 'Некорректный номер',
        email: 'Некорректный e-mail'
      }
    });
  });
  jQuery.validator.addMethod('email', function (value, element) {
    return this.optional(element) || /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
  });
  jQuery.validator.addMethod('phone', function (value, element) {
    return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
  });
}

checkValidate();

// Select
if($('.select').length > 1) {
  $('select').each(function() {
    let $this = $(this).not('.select-search');
    let parent = $(this).not('.select-search').parents('.select');
    $this.select2({
      minimumResultsForSearch: Infinity,
      dropdownParent: parent
    });
  });
  $('.select-search').each(function() {
    let $this = $(this);
    let parent = $(this).parents('.select');
    $this.select2({
      dropdownParent: parent
    });
  });
} else {
$('select').select2({
  minimumResultsForSearch: Infinity,
  dropdownParent: $('.select')
});
}

// Input mask
function maskInit() {
  $(".phone-mask").inputmask({
    mask:"+7(999) 999-99-99",
    "clearIncomplete": true
  });
  $(".card-mask").inputmask({
    mask:"9999 9999 9999 9999",
    "clearIncomplete": true
  });
}
maskInit();

// Accordion
function openAccordion() {
  var wrap = $('.accordion-wrap');
  var accordion = wrap.find('.accordion-title');

  accordion.on('click', function () {
    var $this = $(this);
    var $parent = $(this).parent();
    var content = $this.next();

    if (content.is(':visible')) {
      $this.removeClass('active');
      $parent.removeClass('active');
      content.slideUp('fast');
    } else {
      $this.addClass('active');
      $parent.addClass('active');
      content.slideDown('fast');
    }
  });
}
openAccordion();

$('.tab-trigger').click(function(){
    $('.tab-trigger').removeClass('active');
    var tab = $(this).data('tab');
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-item').removeClass('active');
    $('.tab-item.' + tab).addClass('active');
});