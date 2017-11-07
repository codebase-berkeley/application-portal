$(document).ready(function(){

$("#addq").hide();
$("#add_options").hide();
$(".edit_question").hide();

$("#add_question_button").click(function(){
	$("#addq").show();
	$(".add_options").hide();
	$(this).hide();
});

$("#question_type").on("change", function(){
	var types_with_options = ["radio", "checkbox", "dropdown"];
	if ($.inArray(this.value, types_with_options) >= 0) {
		$("#add_options").show();
	}
});

$(".add_option_button").click(function(){
	if ($(this).parent().parent().closest('div').attr('id') == "addq") {
		$(this).parent().find(".new_options_list").append("<input type='text' name='options'><br>");
	} else {
		$(this).parent().find(".new_options_list").append('<input type="checkbox" value="True"> <input type="text" name="options"><br>');
	}
});

$(".edit-button").click(function(){
	// $(this).parent().parent().parent().find(".static_question").hide();
	// $(this).parent().parent().parent().find(".edit_question").show();
	$(this).closest(".question").find(".static_question").hide();
	$(this).closest(".question").find(".edit_question").show();
});

});
