$(document).ready(function() {

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
            $(placesArray).each(function(i, el) {
                $('#ordered').text(function() {
                    return el;
                });
            });
        } else {
            placesArray = $.grep(placesArray, function(value) {
                return value != place;
            });
        }
        console.log(placesArray);
    });

});
