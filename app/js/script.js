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
                <span data-choosen='${placesArray[placesArray.length - 1]}'>${placesArray[placesArray.length - 1]},</span>
                `;

            document.querySelector('.book__content__form__content__order .jspPane').innerHTML += `
                <p data-choosen="${place}">Столик №${placesArray[placesArray.length - 1]}</p>
             `;

            $('.book__content__form__content__order').jScrollPane();

        } else {
            placesArray = $.grep(placesArray, function(value) {
                return value != place;
            });
            document.getElementById('ordered').querySelector(`span[data-choosen='${place}']`).remove();
            document.querySelector(`.book__content__form__content__order p[data-choosen="${place}"`).remove();
            $('.book__content__form__content__order').jScrollPane();
        }
    });

});
