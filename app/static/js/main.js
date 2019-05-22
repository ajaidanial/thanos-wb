(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (form.checkValidity() === true) {
                    if (form.attr('id') === 'login') {
                        // login form

                    }
                    else {
                        // sign up form

                    }
                    alert("test");
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

$('#signup_un').on('input', function (e) {
    $('#signup_un').val(this.value.replace(" ", "").replace(/[^a-zA-Z0-9]/g, ''));
});

$('#signin_un').on('input', function (e) {
    $('#signin_un').val(this.value.replace(" ", "").replace(/[^a-zA-Z0-9]/g, ''));
});

function showLoader(btn) {
    btn.prop('disabled', true);
    btn.find('.spinner-border').removeClass("d-none")
}

showLoader($('#login').find('.submit_btn'));

// // TEST
// $('#contactForm').validate({
//     submitHandler: function (form) {
//         // var sLoader = $('#submit-loader');
//         $.ajax({
//             type: "POST",
//             url: "inc/sendEmail.php",
//             data: $(form).serialize(),
//             // beforeSend: function () {
//             //     sLoader.fadeIn();
//             // },
//             success: function (msg) {
//                 // Message was sent
//                 if (msg == 'OK') {
//                     sLoader.fadeOut();
//                 }
//                 // There was an error
//                 else {
//                     // sLoader.fadeOut();
//                     // $('#message-warning').html(msg);
//                     // $('#message-warning').fadeIn();
//                 }
//             },
//             error: function () {
//                 // sLoader.fadeOut();
//                 // $('#message-warning').html("Something went wrong. Please try again.");
//                 // $('#message-warning').fadeIn();
//             }
//         });
//     }
// });