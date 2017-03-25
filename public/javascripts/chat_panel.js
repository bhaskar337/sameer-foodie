var down=true;
var rightStatus=false;
var oldWidth = $(window).width();

/*rotate clockwise*/
function rotateClock(element){
  $(element).css('ms-transform','rotate(180deg)');
  $(element).css('-webkit-transform','rotate(180deg)');
  $(element).css('transform','rotate(180deg)');
  $(element).css('transition','0.5s');
}

/*rotate anticlockwise*/
function rotateAntiClock(element){
  $(element).css('ms-transform','rotate(0deg)');
  $(element).css('-webkit-transform','rotate(0deg)');
  $(element).css('transform','rotate(0deg)');
  $(element).css('transition','0.5s');
}

function manageRightPanel(e,element){
  e.preventDefault();
  width = $(window).width();
  if(rightStatus==false){
    rotateClock(element);
    $('.right-panel').css('width','250px');
  }

  else{
    rotateAntiClock(element);
    $('.right-panel').css('width','0px');
  }
  rightStatus=!rightStatus;
}

function handleOnResize(){
  calculate_popups();
  currentWidth = $(window).width();
  if(oldWidth < currentWidth && currentWidth >= 992){
    $('.right-panel').css('width','250px');

    if(rightStatus == 1){
      rotateAntiClock($('#right-panel-button'));
      rightStatus = 0;
    }
  }   

  if(oldWidth > currentWidth && currentWidth < 992){
    $('.right-panel').css('width','0px');
  }
  oldWidth = currentWidth;
}  

$(document).ready(function(){

  $('.navbar-toggle').click(function(){
    if(down==true){
      rotateClock(this);
    }
    else{
      rotateAntiClock(this);
    }
    down=!down;
  });


  /*Show and Hide Right Side Panel and rotate glyph*/
  $('#right-panel-button').click(function(e){
    manageRightPanel(e,this);
  });

});

window.addEventListener("resize",handleOnResize);
