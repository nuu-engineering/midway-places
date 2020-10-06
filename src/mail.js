
$(document).ready(function(){
  $('#wf-form-Email-Form').submit(function(e) {

    // return false so form submits through jQuery rather than reloading page.
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;

    var thisForm = $(this).closest('#wf-form-Email-Form');
    thisForm.siblings('.w-form-fail').css('display', 'none');

    jQuery.ajax({
      type: "POST",
      url: "https://midway.nuu.co/mail.php",
      data: thisForm.serialize(),
      success: function(response) {
        thisForm.fadeOut(300);
        var error = thisForm.siblings('.w-form-fail').css('display', 'none');
        var success = thisForm.siblings('.w-form-done').fadeIn(300);
      },
      error: function(errorObject, errorText, errorHTTP) {
        thisForm.css('display', 'block');
        var error = thisForm.siblings('.w-form-fail').fadeIn(300);
      }
    });
  });
});
