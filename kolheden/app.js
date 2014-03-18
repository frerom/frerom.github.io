$(".button").on("click", function () {
    $(this).height($(this).height());
    $(this).height(0);
    $(this).css("opacity", 0);
    var box = $(".box");
    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
            'key': '7BPxFo4tlJCrwsrHIsP-vg',
            'message': {
                'from_email': 'roman.fredrik@gmail.com',
                'to': [
                    {
                        'email': 'roman.fredrik@gmail.com',
                        'type': 'to'
                    }
                ],
                'autotext': 'true',
                'subject': 'Kolhedeninbjudan',
                'html': $('#name').val() + " har accepterat inbjuden till festligheterna"
            }
        }
    }).done(function(response) {
        box.css('opacity', 0);
        $(".success").css('display', 'block').addClass("blink");
    }).error(function () {
        box.css('opacity', 0);
        $(".error").css('display', 'block').addClass("blink");
    });
});
