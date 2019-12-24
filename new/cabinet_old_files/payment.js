$(function() {

  $('.cc-num').payment('formatCardNumber');
  $('.cc-cvc').payment('formatCardCVC');

  var validateDetails = function() {

    var validateCVC = $.payment.validateCardCVC($('.cc-cvc').val());
    if (validateCVC) {
      $('.cc-cvc__demo').addClass('identified');
    } else {
      $('.cc-cvc__demo').removeClass('identified');
    }

  }

  $('.paymentInput').bind('change paste keyup', function() {
    validateDetails();
  });


  // just hover cvc
  $(".codebox-icon").hover(function(){
  	$(".icons-cvv__popup").toggleClass("icons-cvv-hovered");
  })

});