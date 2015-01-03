
((function(undefined){

  var bg = ((function(undefined){
    var wide = $(window).width();
    return './image/background/' + ( (wide > 2560) ? 5120 : (wide > 1920) ? 2560 : 1920 ) + '.jpg';
  })());

  $('#bg').hide().css({ backgroundImage : 'url("' + bg + '")' });

  $('div.icon>h3').hide();

})());


((function(undefined){

  $('div.icon').hover(function(){
    $('#bg')
      .stop()
      .fadeIn(
          25000
        , function(){
            $('div.icon')
              .delay(5000)
              .queue(function(){ $(this).trigger('click').dequeue(); });
        }
      );
    $('div.icon>h3').fadeIn('fast');
  }
  , function(){
    $('#bg').stop().fadeOut(300);
    $('div.icon>h3').fadeOut(500);
  })
  .click(function(e){
    $('div.icon')
      .unbind('mouseenter')
      .unbind('mouseleave')
      .fadeOut('fast');

    $('#bg').stop();
  });

})());
