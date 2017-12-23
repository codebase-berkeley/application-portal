$("div.selection_box").click(function() {
    if ($(this).find('img').length) {
        $(this).html('');
    } else {
        $(this).html('<img src="{% static "images/check.svg" %}" width="17px" height="17px">');
    }
});