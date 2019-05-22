(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (form.checkValidity() === true) {
                    if (form.id === 'login') {
                        ajaxReq($('#login'))
                    }
                    else {
                        ajaxReq($('#signup'))
                    }
                }
                invalid_feedback_op(form);
            }, false);
        });
    }, false);
})();

function invalid_feedback_op(form, msg = "") {
    if (msg !== "") {
        $(form).removeClass('was-validated');
        if (msg === "username_not_unique") {
            $(form).find('#signup_un').addClass('is-invalid');
        }
        if (msg === "invalid_details") {
            $(form).find('#signin_un').addClass('is-invalid');
            $(form).find('#signin_pass').addClass('is-invalid');
        }
    }
    if (msg === "") {
        $(form).addClass('was-validated');
        if (form.id === 'login') {
            $(form).find('#signin_un').removeClass('is-invalid');
            $(form).find('#signin_pass').removeClass('is-invalid');
        }
        else {
            $(form).find('#signup_un').removeClass('is-invalid');
        }
    }
}

$('#signup_un').on('input', function (e) {
    $('#signup_un').val(this.value.replace(" ", "").replace(/[^a-zA-Z0-9]/g, ''));
});

$('#signin_un').on('input', function (e) {
    $('#signin_un').val(this.value.replace(" ", "").replace(/[^a-zA-Z0-9]/g, ''));
});

function show_hide_Loader(form) {
    var btn = form.find('.submit_btn');
    if (btn.find('.spinner-border').hasClass("d-none")) {
        btn.prop('disabled', true);
        btn.find('.spinner-border').removeClass("d-none")
    }
    else {
        btn.prop('disabled', false);
        btn.find('.spinner-border').addClass("d-none")
    }
}

function ajaxReq(form) {
    $.ajax({
        type: "POST",
        url: "validate",
        data: $(form).serialize(),
        beforeSend: function () {
            show_hide_Loader(form)
        },
        success: function (response) {
            if (response['success']) {
                form.submit();
            }
            else {
                invalid_feedback_op(form, response['msg']);
                if (response['msg'] === 'username_not_unique') {
                    alert("Username already taken.");
                }
                if (response['msg'] === 'invalid_details') {
                    alert("Username and Password does not match.");
                }
            }
            show_hide_Loader(form);
        },
        error: function () {
        }
    });
}
// TODO: add char check