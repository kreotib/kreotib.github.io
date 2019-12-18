// Импортируем другие js-файлы
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
$(document).ready(function(){
  $('.faq-section__title').click(function(){
    $(this).toggleClass('active');
  });
  
$('.achievements-slider').slick({
  slidesToShow: 3,
  dots:true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});
var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});
});
$(document).ready(function(){
  $('.pop-up__tile').click(function(){
    $('.pop-up__tile').removeClass('active');
    $(this).addClass('active');
  });
  $('.purchase__toggle').click(function(){
    $('.popup-purchase').toggleClass('active');
    $('body').toggleClass('no-overflow');
    $('.blur-block').toggleClass('active');
  });
  $('.subs__toggle').click(function(){
    $('.popup-subs').toggleClass('active');
    $('body').toggleClass('no-overflow');
    $('.blur-block').toggleClass('active');
  });
  $('.menu__toggler').click(function(){
    $('.header__menu').toggle();
  }); 
});