$(document).ready(function()
{
$('#login').hide();
$('#search').show();
  
$("#loginbtn").click(function() 
{
	$("#login").show('fast');
	$("#search").hide('slow'); 	
});

    

});