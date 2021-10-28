$( document ).ready(() => {
    $('.radio-color').change((ev) =>{
        const variant = $('.radio-color:checked').val();

        $(".productImg").addClass("d-none");
        $(`img[data-variation_value='${variant}']`).removeClass("d-none");
    }).change();
});

