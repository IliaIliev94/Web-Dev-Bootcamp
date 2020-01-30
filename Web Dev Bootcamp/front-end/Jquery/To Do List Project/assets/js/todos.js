$("ul").on("click", "li", function() {
    $(this).toggleClass("strikethrough");
});

$("ul").on("click", "span", function(event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    event.stopPropagation();
});

$("input").on("keypress", function(event) {
    if (event.originalEvent.charCode === 13) {
        let newLI = '<li><span><i class="fa fa-trash"></i></span> ' + $(this).val() + '</li>';
        $(this).val("");
        $("ul").append(newLI);
    }
});

$("ul").on("mouseover", "li", function() {
    $(this).children().addClass("activeSpan");
});

$("ul").on("mouseout", "li", function()  {
    $(this).children().removeClass("activeSpan");
});

$(".fa-plus").on("click", function() {
    $("input[type='text']").fadeToggle();
});