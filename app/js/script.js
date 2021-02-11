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
    $('.catalog__body__items__item__preview').lightGallery();
    $('.popup-product__head__photos').lightGallery();


    $('.info-block__carousel, .article__content__carousel').slick({
        nextArrow: `<button type="button">
                        <svg width="51" height="19" viewBox="0 0 51 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 9.5H50.5M50.5 9.5L41.9141 1M50.5 9.5L41.9141 18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     </button>`,
        dots: true,
    });

    $('.delivery__catalog__prods__item__preview').slick({
        nextArrow: `<button type="button" class="arrow-next">
<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.6" d="M1 1L5 5L1 9" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
</button>`,
        prevArrow: `<button class="arrow-prev">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.6" d="M5 1L1 5L5 9" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
        </button>
         `,
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

            if (document.querySelector('.coworking__book__content__form__content__order .jspPane')) {
                document.querySelector('.coworking__book__content__form__content__order .jspPane').innerHTML += `
                <p data-choosen="${place}" class="chosen-place">Место №${placesArray[placesArray.length - 1]}</p>
             `;
            }

            if (document.querySelector('.restaurant__book__content__form__content__order .jspPane'))
            document.querySelector('.restaurant__book__content__form__content__order .jspPane').innerHTML += `
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


    $('.masked-input').mask("+9(999) 999-99-99");

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

    $('#basicForm form').validate({
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

    $('.delivery-page__block-form__form').validate({
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

    $('#ordering form').validate({
        rules: {
            phone: {
                required: true,
                minlength: 17,
            },

            city: {
                required: true,
                minlength: 1,
            },

            street: {
                required: true,
                minlength: 1,
            },

            house: {
                required: true,
            }
        },
        messages: {
            phone: {
                required: 'Пожалуйста, введите свой номер телефона',
            }
        }
    });


    $('input').blur(function() {
        console.log($(this).val());

        if ($(this).val() === '') {
            setTimeout($(this).removeClass("valid"), 1000);
        }
    })


    function getCoords(elem) {
        var box = elem[0].getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    if (window.innerWidth >= 1090) {
        $('.delivery__catalog__prods__item__content__informer, .catalog__body__items__item__informer').mouseover(function() {
            var coords = getCoords($(this));

            $('#informer').css('top', coords.top + 5);
            $('#informer').css('left', coords.left + 5);
            $('#informer').addClass('show')
        });

        $('#informer').mouseleave(function(event) {
            $('#informer').removeClass('show');

        });
    } else {
        $('.delivery__catalog__prods__item__content__informer').click(function() {
            $('#informer').addClass("active");
            $('body').css('overflow', 'hidden');
        });
    }

    if (window.innerWidth >= 1090) {
        $('.catalog__body__items__item__informer').mouseover(function() {
            var coords = getCoords($(this));

            $('#informer').css('top', coords.top + 8);
            $('#informer').css('left', coords.left + 7);
            $('#informer').addClass('show')
        });

        $('#informer').mouseleave(function(event) {
            $('#informer').removeClass('show');

        });
    } else {
        $('.catalog__body__items__item__informer').click(function() {
            $('#informer').addClass("active");
            $('body').css('overflow', 'hidden');
        });
    }


    $('.stock__nav button').click(function() {
        $('.stock__nav button').removeClass('active');
        $(this).addClass('active');
        var dataStock = $(this).attr('data-stock');
        $('.stock__content').removeClass("show");
        $('.stock__content').each(function(i, el) {
            if ($(el).attr('data-stock') === dataStock) {
                $(el).addClass('show');
            }
        });
    });


    $(document).keyup(function(e) {
        console.log(e.which);
        if (e.which === 27) {
            $('.popup').removeClass('active');
            $('body').css('overflow', 'visible');
        }
    });

    $('input[name=delivery]').click(function(e) {
        console.log($(this).attr('id'));
        if ($(this).attr('id') === 'pickup') {
            $('.popup-ordering__form__delivery-fields').css('display', 'none');
        } else {
            $('.popup-ordering__form__delivery-fields').css('display', 'block');

        }
    });

    $('.book__content__form__content__fields__button').click(function() {
        $('#orderSuccess').removeClass('active');
    });

});
