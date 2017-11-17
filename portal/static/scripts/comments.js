$("#submit").on("click", function(event) {
    event.preventDefault();
    var data = {
        text: $("#text").val(),
        csrfmiddlewaretoken: "{{ csrf_token }}"
    };
    $.post("{% url 'portal:create_comment'%}", data, function(res) {
        event.preventDefault();
        $("#comments").append("<p><b>dfdsafa"+ ":</b> " + $("#text").val() + "</p>");
        if (res.success) {
            $("#comments").append("<p><b>" + hello + ":</b> " + $("#text").val() + "</p>");
        }
    }, "JSON")
    /*
    $.post("portal/comment/create/{{id}}", data, function(res) {
        event.preventDefault();
        $("#comments").append("<p><b>dfdsafa"+ ":</b> " + $("#text").val() + "</p>");
        if (res.success) {
            $("#comments").append("<p><b>" + hello + ":</b> " + $("#text").val() + "</p>");
        }
    }, "JSON")
    */
});
