$(document).ready(function(){

$("#addq").hide();
$("#add_options").hide();

$("#add_question_button").click(function(){
	$("#addq").show();
	$("#add_options").hide();
});

$("#question_type").on("change", function(){
	var types_with_options = ["radio", "checkbox", "dropdown"];
	if ($.inArray(this.value, types_with_options) >= 0) {
		$("#add_options").show();
	}
});

$("#add_option_button").click(function(){
	$("#new_options_list").append("<input type='text' name='options'><br>");
});

});
