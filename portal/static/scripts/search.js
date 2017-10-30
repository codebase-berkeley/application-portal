$(document).ready(function(){

$(".searchTerm").on("change", function(){
	$(".applications").hide();
	$(this).parent().append(search(this.value));



});

});