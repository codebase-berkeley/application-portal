/* Handles dropdowns (you can only see one at a time) */
$("#catDropBtn").hover(function() {
  $("#userDropdown").hide();
  $(".cat-dropdown").show();
}, function(){return;}); 

$("#userDropBtn").hover(function() {
  $(".cat-dropdown").hide();
  $("#userDropdown").show();
}, function(){return});

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    $(".dropdown-content").hide();
  }
}

$(".userElem").on("click", function(event) {
  var curruser_pk = $(this).val()
  var currapp_pk = $("#application_pk").val();
  var button = $(this);

  var data = {
    app_pk: currapp_pk,
    user_pk: curruser_pk,
    csrfmiddlewaretoken: csrftoken
  }

  button.find("i").toggleClass("hidden");  // Responsively changes whether or not the user has a checkmark next to them

  $.post("/portal/assign_user/", data, function(res) {});
});

$(".catElem").on("click", function(event) {
  var currcat_pk = $(this).val()
  var currapp_pk = $("#application_pk").val()
  var button = $(this);

  var data = {
    app_pk: currapp_pk,
    cat_pk: currcat_pk,
    csrfmiddlewaretoken: csrftoken
  }

  /* Responsively changes whether or not the category has a checkmark next to it */
  $(".catElem").find("i").addClass("hidden")
  button.find("i").removeClass("hidden"); 
  $.post("/portal/assign_category/", data, function(res) {});
  
});  
$("#submit").on("click", function(event) {
    var data = {
        text: $("#text").val(),
        csrfmiddlewaretoken: csrftoken
    };
    $.post("{% url 'portal:create_comment' id %}", data, function(res) {
        event.preventDefault();
        if (res.success) {
          $(".com-info").append('<div id = ' + res.id + '><div class = "crop"><img src="{% static "images/user.png" %}" alt="cannot load"/></div><p class = "commenter">' + res.user + '</p><br><p class = "content">' + res.text +'</p><form onsubmit = "return false" class = "right-form" ><input class = "delete" type="image" id = "del" src = "{% static "images/trash.svg"%}" value = ' + res.id +'></form>');
        }
    }, "JSON")
});
$(document).on('click', '.delete', function() {
  event.preventDefault();
  var data = {
    num: $(this).val(),
    csrfmiddlewaretoken: csrftoken
  }
  $.post("{% url 'portal:delete_comment'%}", data, function(res) {
      if (res.success){
        console.log(res.id);
        $(res.id).remove();
      }
  }, "JSON")
});