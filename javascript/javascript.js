   $(document).ready(function(){

   	$('.button-collapse').sideNav('hide');
    $(".button-collapse").sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
      });
  

  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible').collapsible();
  //this one causes error but makes navbar not pop out by itself when page loads
  $('.main').side-Nav('hide');
 

   // Show sideNav
 $('.button-collapse').sideNav('show');
  // modal functions here
 


     // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
       
    

    });
