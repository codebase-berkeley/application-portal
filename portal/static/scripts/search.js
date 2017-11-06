$(document).ready(function(){

$(".searchTerm").on("change keyup paste", function() {
	$.get("portal/search/"+this.value, function(data, status){
        $(".applications").replaceWith(data)});
    });
});
