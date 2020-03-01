// Импортируем другие js-файлы

$(document).ready(function() {
  new WOW().init();
  const levelLink = $(".level-link"),
    levelContent = $(".level-content"),
    levelList = $(".level-list"),
    body = $("body"),
    toggleLink = $(".toggle-link"),
    toggleBlock = $(".toggle-block"),
    reviewVideoWrapper = $(".video-review__wrapper"),
    reviewControlButton = $(".video-review__button"),
    reviewList = $(".reviews__list"),
    mobileMenu = $(".mobile-menu"),
    modalBlockButtonOpen = $(".modal-block__open"),
    modalBlockButtonClose = $(".modal-block__close"),
    modalBlock = $(".modal-block"),
    reviewListItem = $(".reviews__item"),
    reviewMore = $(".more_link a");

  //REVIEW ITEM
  reviewListItem.map(function(index, element) {
    $(element).addClass("hide");
    if (index <= 2) {
      $(element).removeClass("hide");
    }
  });
  $(reviewMore).click(function(e) {
    e.preventDefault();
    let reviewItem = document.querySelector(".reviews__item.hide");
    $(reviewItem).removeClass("hide").addClass('slideInUp');
    if (!reviewItem) {
      $(".more_link").hide();
    }
  });
  //MODAL BLOCK SETTING
  $(modalBlockButtonOpen).click(function() {
    $(modalBlock).addClass("open");
    $(body).addClass("overflow");
  });
  $(modalBlockButtonClose).click(function() {
    $(modalBlock).removeClass("open");
    $(body).removeClass("overflow");
  });
  //MOBILE MENU SETTING
  $(mobileMenu).click(function() {
    $(this).toggleClass("active");
  });
  //Level show/hide settings
  $(levelLink).click(function() {
    $(levelContent).addClass("active");
    $(body).addClass("overflow");
  });
  $(".level-content").mouseup(function(e) {
    if (levelList.has(e.target).length === 0) {
      levelContent.removeClass("active");
      body.removeClass("overflow");
    }
  });

  //Toggle block settings
  $(toggleLink).click(function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .find(toggleBlock)
      .toggle(500);
  });

  //Review block settings
  $(reviewControlButton).click(function(e) {
    e.preventDefault();
    if ($(reviewVideoWrapper).hasClass("active")) {
      $(reviewList).removeClass("hide");
      $(reviewVideoWrapper).removeClass("active");
      $(this)
        .addClass("video")
        .text("'Живой отзыв'");
    } else {
      $(reviewList).addClass("hide");
      $(reviewVideoWrapper).addClass("active");
      $(this)
        .removeClass("video")
        .text("Отзывы");
    }
  });
  let offerSectionTop = $("#offer-section").offset().top;
  $(document).scroll(function() {
    if ($(document).scrollTop() > offerSectionTop) {
      $(".contact-form").addClass("active");
    }
  });
});

//SCROLL TO ANCHORN
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    1500
  );
});


//INPUT PHONE MASK NATIVE JS
window.addEventListener("DOMContentLoaded", function() {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }

  function mask(event) {
    var matrix = "+38 (___) ___ __ __",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else setCursorPosition(this.value.length, this);
  }
  var input = document.querySelector(".input-phone");
  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
});