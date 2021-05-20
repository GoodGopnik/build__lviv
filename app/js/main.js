$('.portfolio-slider__slide-min').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    responsive: [
        {
            breakpoint: 890, 
            settings: {
                vertical: false,
                verticalSwiping: false,
                slidesToShow: 3,
            }
        }
    ],
    asNavFor: '.portfolio-slider__img',
});
$('.portfolio-slider__img').slick({
    slidesToShow: 1,
    arrows: false,
    infinite: true,
    arrows: true,
    dots: true,
    asNavFor: '.portfolio-slider__slide-min',
    prevArrow: "<img src='./images/block4/Path.png' class='arrow__prev' alt='img'>",
    nextArrow: "<img src='./images/block4/Path.png' class='arrow__next' alt='img'>",
});
$('.reviews-block__block-slider').slick({
    slidesToShow: 1,
    arrows: false,
    infinite: true,
    arrows: true,
    dots: true,
    asNavFor: '.portfolio-slider__slide-min',
    prevArrow: "<img src='./images/block4/Path.png' class='arrow__prev' alt='img'>",
    nextArrow: "<img src='./images/block4/Path.png' class='arrow__next' alt='img'>",
});