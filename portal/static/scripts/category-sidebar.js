var new_category_open = false;
var edit_category_open = false;

var original_html = $(".categories").html();

$("#new-category-link").click(function() {
    new_category_open = true;
    edit_category_open = false;
    var $new-div = $("#new-category");
    $new-div.empty();
    $new-div.append("<input type='text' name='name'><button class='ok'>Ok</button><button class = 'cancel'>Cancel</button>");
});

$("#new-category.ok").click(function() {
    createNewCategory();
});

$("#new-category.cancel").click(function() {
    new_category_open = false;
    $(".categories").html(original_html);
});

$("body").keypress(function(e) {
    var key = e.which;

    if (key == 13) {
        if (new_category_open) {
            createNewCategory();
        } else if (edit_category_open) {
            editCategory();
        }
    }
});