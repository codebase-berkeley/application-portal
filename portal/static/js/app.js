var curr_URL;
var arr;
var app;

$( document ).ready(function() {
    console.log( "document loaded");

    curr_URL = window.location.href;
    arr = curr_URL.split('/');
    app = arr[arr.length-1];

    $("#star-1").on('click',function(event) {
        console.log("click");
        event.preventDefault();
        var data = {
            rating: $("#rating").val(),
            csrfmiddlewaretoken: "{{ csrf_token }}"
        };

        $.post("/portal/change_rating/" + app + "/", data, function(res) {
            event.preventDefault();
            if (res.success) {
                $("#ratinfo").empty();
                //for i in rating, append a filled star to the div
                for (i = 0; i < rating; i++) {
                    $("#ratinfo").append(FULLSTAR);
                }
                for (i = 0; i < 5-rating; i++) {
                    $("ratinfo").append(EMPTYSTAR);
                }
            }
        }, "JSON")
    });

    $("#star-2").on('click',function(event) {
        console.log("click");
        event.preventDefault();
        var data = {
            rating: $("#rating").val(),
            csrfmiddlewaretoken: "{{ csrf_token }}"
        };
        $.post("/portal/change_rating/" + app + "/", data, function(res) {
            event.preventDefault();
            if (res.success) {
                $("#ratinfo").empty();
            }
        }, "JSON")
    });

    $("#star-3").on('click',function(event) {
        console.log("click");
        event.preventDefault();
        var data = {
            rating: $("#rating").val(),
            csrfmiddlewaretoken: "{{ csrf_token }}"
        };
        $.post("/portal/change_rating/" + app + "/", data, function(res) {
            event.preventDefault();
            if (res.success) {
                $("#ratinfo").empty();
            }
        }, "JSON")
    });

    $("#star-4").on('click',function(event) {
        console.log("click");
        event.preventDefault();
        var data = {
            rating: $("#rating").val(),
            csrfmiddlewaretoken: "{{ csrf_token }}"
        };
        $.post("/portal/change_rating/" + app + "/", data, function(res) {
            event.preventDefault();
            if (res.success) {
                $("#ratinfo").empty();
            }
        }, "JSON")
    });

    $("#star-5").on('click',function(event) {
        console.log("click");
        event.preventDefault();
        var data = {
            rating: $("#rating").val(),
            csrfmiddlewaretoken: "{{ csrf_token }}"
        };
        $.post("/portal/change_rating/" + app + "/", data, function(res) {
            event.preventDefault();
            if (res.success) {
                $("#ratinfo").empty();
            }
        }, "JSON")
    });

});

