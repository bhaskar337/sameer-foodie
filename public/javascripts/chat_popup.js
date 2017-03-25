
//this variable represents the total number of popups can be displayed according to the viewport width
var total_popups = 0;

//arrays of popups ids
var popups = [];

//this is used to close a popup
function close_popup(id)
{
  for(var i in popups)
  {
    if(id == popups[i])
    {
      popups.splice(i,1);

      $('#'+id).hide();

      calculate_popups();

      return;
    }
  }
}

//displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
function display_popups()
{
  var right = ($(window).width()-(total_popups*320))/total_popups;
  var i;
  for(i=0; i < total_popups; i++)
  {
    if(popups[i])
    {
      $('#'+popups[i]).css("right",right+"px").show();
      right+=350;
    }
  }
  
   for(var j = i; j < popups.length; j++)
   {
      $('#'+popups[j]).hide();
   }
}

//creates markup for a new popup. Adds the id to popups array.
function register_popup(id, name)
{

  for(var i in popups)
  {
    //already registered. Bring it to front.
    if(id == popups[i])
    {
      popups.splice(i,1);

      popups.unshift(id);

      resizePopup($('#'+id),false);

      calculate_popups();

      return;
    }
  }

  var element = '<div class="popup-box chat-popup" id="'+id+'">';
  element = element + '<div class="popup-head">';
  element = element + '<div class="popup-head-left">'+ name +'</div>';
  element = element + '<div class="popup-head-right" data-target="'+id+'">&#10005</div>';
  element = element + '<div style="clear: both"></div></div><div class="popup-body-form-wrapper"><div class="popup-messages"></div>';
  element = element + '<form class="message"> <input type="text" class="message-input"></input><button type="submit" value="" class="send-button"><span class="glyphicon glyphicon-send"></span></button></form></div></div>';


  $('body').append(element)

  popups.unshift(id);

  calculate_popups();

}


//calculate the total number of popups suitable and then populate the total_popups variable.
function calculate_popups()
{
  var effectiveWidth = $(window).width();
  if(effectiveWidth < 300)
  {
    total_popups = 0;
  }
  else if(effectiveWidth < 1200)
  {
    //320 is width of a single popup box
    total_popups = parseInt(effectiveWidth/300);
  }

  else{
    effectiveWidth = effectiveWidth-250*2;
    total_popups = parseInt(effectiveWidth/300);
  }
  display_popups();

}

//recalculate when window is loaded and also when window is resized.
window.addEventListener("load", calculate_popups);

//minimizes or Maximizes the popup box
function resizePopup(popupBox,toggle){
    if (popupBox.height() == 283&&toggle==true) {
        $(popupBox).animate(
                {height: "30px"});
      }
      else if (popupBox.height() == 28) {
        $(popupBox).animate(
                {height: "285px"});
    }
}

  //displays the message
function displayMessage(formElement){
  var message = $(formElement).children('.message-input').val();
    if(message) {
      $(formElement).children('.message-input').val("");
      var decoratedMessage = '<div class="s_message">'+message+'</div>';
      $(formElement).siblings('.popup-messages').append(decoratedMessage);

      var to = $(formElement).parents('.popup-box').attr('id');
      sendMessage(message,to);
    }
}

function recieveMessage(data){
  for (var i in popups){
    if (data.from==popups[i]){
      var decoratedMessage = '<div class="r_message">'+data.message+'</div>';
        $('#'+data.from).find('.popup-messages').append(decoratedMessage);
    }
  }
}


$(document).ready(function(){

    //message is submitted
    $('body').on('submit', '.message',function(e){
      e.preventDefault();
      displayMessage(this);
    });

    //Any friend from match is clicked
    $('.expert').click(function(){      
      var id=$(this).data('target');
      register_popup(id,id);
    });

    //minimizes or Maximizes the popup box
    $('body').on('click', '.popup-head-left',function(){
        var popupBox = $(this).parents('.popup-box');
        resizePopup(popupBox,true);      
      });

    //closes the popup box
    $('body').on('click', '.popup-head-right',function(){
      var id=$(this).data('target');
      close_popup(id);
    });

});