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

function show_hide_Loader(form) {
    var btn = form.find('.submit_btn');
    if (btn.prop('disables')) {
        btn.prop('disabled', false);
        btn.find('.spinner-border').addClass("d-none")
    }
    else {
        btn.prop('disabled', true);
        btn.find('.spinner-border').removeClass("d-none")
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
        success: function (msg) {
            if (msg == 'OK') {
                show_hide_Loader(form)
            }
            else {
            }
        },
        error: function () {
        }
    });
}