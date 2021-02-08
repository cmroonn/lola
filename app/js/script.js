$(document).ready(function() {

    $('.header__burger').click(function() {
        $('.mob-menu-wrap').addClass("active");
        $('body').css('overflow', 'hidden');
    });

    $('.mob-menu__close').click(function() {
        $('.mob-menu-wrap').removeClass("active");
        $('body').css('overflow', 'visible');
    });

    $('.header__action__order-call, .footer__block__order').click(function() {
        $('#basicForm').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    $('.popup__body__close').click(function() {
        $(this).closest('.popup').removeClass('active');
        $('body').css('overflow', 'visible');
    });


    $('.book__content__form__content__order').jScrollPane();

    $('.gallery__content').lightGallery();

    $('.info-block__carousel').slick({
        nextArrow: `<button type="button">
                        <svg width="51" height="19" viewBox="0 0 51 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 9.5H50.5M50.5 9.5L41.9141 1M50.5 9.5L41.9141 18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     </button>`,
        dots: true,
    });

    console.log($('.restaurant-schema__place'));


    var placesArray = [];

    $('.restaurant-schema__place').mouseover(function() {
        $(this).addClass('hovered');
    });

    $('.restaurant-schema__place').mouseout(function() {
        $(this).removeClass('hovered');
    });

    $('.restaurant-schema__place').click(function() {
        var place = $(this).attr('data-place');
        $(this).toggleClass('clicked');

        if ($(this).hasClass('clicked')) {
            placesArray.push($(this).attr('data-place'));
            document.getElementById('ordered').innerHTML += `
                <span data-choosen='${placesArray[placesArray.length - 1]}' class="chosen-place">${placesArray[placesArray.length - 1]},</span>
                `;

            document.querySelector('.book__content__form__content__order .jspPane').innerHTML += `
                <p data-choosen="${place}" class="chosen-place">Столик №${placesArray[placesArray.length - 1]}</p>
             `;

            $('.book__content__form__content__order').jScrollPane();

            console.log(document.querySelectorAll('.chosen-place'));
            document.querySelectorAll('.chosen-place').forEach(function(el) {
                el.addEventListener('click', function() {
                    console.log(el.dataset.choosen);
                    placesArray = $.grep(placesArray, function(value) {
                        return value != el.dataset.choosen;
                    });

                    document.getElementById('ordered').querySelector(`span[data-choosen='${el.dataset.choosen}']`).remove();
                    document.querySelector(`.book__content__form__content__order p[data-choosen="${el.dataset.choosen}"`).remove();
                    $('.book__content__form__content__order').jScrollPane();
                    $(`.restaurant-schema__place[data-place=${el.dataset.choosen}]`).toggleClass('clicked');
                });
            });


        } else {
            placesArray = $.grep(placesArray, function(value) {
                return value != place;
            });
            document.getElementById('ordered').querySelector(`span[data-choosen='${place}']`).remove();
            document.querySelector(`.book__content__form__content__order p[data-choosen="${place}"`).remove();
            $('.book__content__form__content__order').jScrollPane();
        }
    });


    $('#clearAll').click(function() {
        placesArray = [];
        $('.chosen-place').remove();
        $('.restaurant-schema__place').removeClass('clicked');

    });


    $('.masked-input').mask("+7(999) 999-99-99");

    $('.form-name-and-phone').validate({
        rules: {
            phone: {
                required: true,
                minlength: 17,
            },
        },
        messages: {
            phone: {
                required: 'Пожалуйста, введите свой номер телефона',
            }
        }

    });

});
