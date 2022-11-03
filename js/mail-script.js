
    // -------   Mail Send ajax Newsletter

    $(document).ready(function() {
        var form = $('#mc_embed_signup'); // contact form
        var submit = $('.submit-btn'); // submit button
        var alert = $('.alert-msg'); // alert div for show alert message
        var input_ele = $(' .input');
        var form_impress = $('#mc_embed_signup-impress');
        var form_news = $('#mc_embed_signup-news');
        // form submit event
        form_impress.on('submit', function(e) {
            e.preventDefault();
            var input = document.querySelector('#beta-impress');
            const formData = new FormData(input);
            var object = {};
            formData.forEach((value, key) => {object[key] = value});
            var req_data = JSON.stringify(object);

            $.ajax({
                url: "https://hb5vrrii07.execute-api.us-east-1.amazonaws.com/Prod/website/register", // form action url
                type: 'POST', // form submit method get/post
                dataType: 'html', // request type html/json/xml
                data: req_data, // serialize form data
                timeout: 0,
                origin: "https://keploy.io",
                contentType: "application/json",
                beforeSend: function() {
                    alert.fadeOut();
                    submit.html('Sending....'); // change submit button text
                },
                success: function(data) {
                    alert.removeClass('text-hide');
                    alert.html("Subscribed to Newsletter!").fadeIn(); // fade in response data
                    form.trigger('reset'); // reset form
                    input_ele.attr("style", "display: none !important");
                    submit.attr("style", "display: none !important"); // reset submit button text
                },
                error: function(e) {
                    console.log(e)
                }
            });
        });

        form.on('submit', function(e) {
            e.preventDefault();
            var input = document.querySelector('#newsletter');
            const formData = new FormData(input);

            var object = {};
            formData.forEach((value, key) => {object[key] = value});
            var req_data = JSON.stringify(object);

            $.ajax({
                url: "https://hb5vrrii07.execute-api.us-east-1.amazonaws.com/Prod/website/register", // form action url
                type: 'POST', // form submit method get/post
                dataType: 'html', // request type html/json/xml
                data: req_data, // serialize form data
                timeout: 0,
                origin: "https://keploy.io",
                contentType: "application/json",
                beforeSend: function() {
                    alert.fadeOut();
                    submit.html('>>...'); // change submit button text
                },
                success: function(data) {
                    alert.removeClass('text-hide');
                    alert.html("Subscribed to Newsletter!").fadeIn(); // fade in response data
                    form.trigger('reset'); // reset form
                    input_ele.attr("style", "display: none !important");
                    submit.attr("style", "display: none !important"); // reset submit button text
                },
                error: function(e) {
                    console.log(e)
                }
            });
        });
    });