$(document).ready(function(){
    $("#id_is_offered").click(function() {
    	$("p_toggle").toggle(this.checked);
    	$( "#id_is_agree" ).prop( "checked", true );
    	// alert('hello');
    });

    $("#formButton").click(function(){
    	$("#p_toggle").toggle(this.checked);
    });

    $("#formButton1").click(function(){
    	$( "#id_is_offered" ).prop( "checked", true );
    });
    
    // if($("#id_is_offered").is(':checked'))
    // 	$("#div_id_is_offered_to").show();
    // else
    // 	$("#div_id_is_offered_to").hide();
});

$("#div_id_is_offered").on("change", "#id_is_offered", function(){
    if($(this).is(':checked')){
        // alert('checked');
        $(this).css('display', 'block')
        $("p_toggle").toggle();
    } else {
        alert('un-checked');
        $(this).css('display', 'none')
    }
});
// $( window ).on( "load", function() {
// 	$("#id_is_offered").click(function() {
//     	$("div_id_is_offered_to").toggle(this.checked);
//     });
// });

// function hider() {
//   // Get the checkbox
//   var checkBox = document.getElementById("id_is_offered");
//   // Get the output text
//   var divs = document.getElementById("div_id_is_offered_to");

//   // If the checkbox is checked, display the output text
//   if (checkBox.checked == true){
//     text.style.display = "block";
//   } else {
//     text.style.display = "none";
//   }
// }