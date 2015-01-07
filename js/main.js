/* ==================================== *
 * background setting                   *
 * ==================================== */
((function(undefined){
  
  var $ns = $leico.$global;
  var bg_table = ['wall', 'netwall', 'colorful'];
  $ns.bg = './image/' + bg_table[ Math.floor( Math.random() * bg_table.length ) ] + '/';

})());


/* ==================================== *
 * window resize setting                *
 * ==================================== */
((function(undefined){

  $(window).resize(function(){
    var $ns = $leico.$global;

    $ns.width  = $(window).width();
    $ns.height = $(window).height();

    var focus = $('#top_icon');

    var fh_width  = focus.width()  / 2;
    var fh_height = focus.height() / 2;
    var h_width   = $ns.width      / 2;
    var h_height  = $ns.height     / 2;

    focus.css({
      position : 'absolute'
        , top    : h_height - fh_height
        , left   : h_width  - fh_width
        , right  : h_width  - fh_width
        , bottom : h_height - fh_height
    });
  })
  .trigger('resize');

})());


/* ==================================== *
 * choose background size               *
 * ==================================== */
((function(undefined){

  var $ns = $leico.$global;

  var bg = $ns.bg + chooseImageSize() + '.jpg';
  $('#bg').append(
      $('<div>')
      .hide()
      .addClass('center')
      .css({
          width  : '100%'
        , height : '100%'
        , backgroundImage    : 'url("' + bg + '")'
        , backgroundPosition : 'center center'
        , backgroundRepeat   : 'no-repeat'
        , backgroundSize     : 'cover'
      })
  );

  $('#top_icon>h3').hide();

})());

/* ==================================== *
 * init description                     *
 * ==================================== */
((function(undefined){
  $('#description').hide();
})());


/* ==================================== *
 * Top Icon & background Event register *
 * ==================================== */
((function(undefined){

  $('#top_icon').hover(function(){
    $('#bg>div')
      .stop()
      .fadeIn(25000, function(){
        $(this)
          .delay(5000)
          .queue(function(){ $('#top_icon').trigger('click').dequeue(); });
      });
    $('#top_icon>h3').stop().fadeIn('fast');
  }
  , function(){
    $('#bg>div')     .stop().fadeOut(300);
    $('#top_icon>h3').stop().fadeOut(500);
  })
  .click(function(e){

    var $ns  = $leico.$global;
    var self = this;

    //Top animation and unbind All Event
    ((function(){
      $(self)
        .attr('id', 'leico')
        .unbind('click')
        .unbind('mouseenter')
        .unbind('mouseleave')
        .animate(
            {top  : '20%'}
          , {
                duration :  600
              , complete : function(){ $('body').trigger('contents'); }
          }
        );

      $(window).unbind('resize');

      $('#bg>div').stop().fadeOut('fast', function(){ $(this).remove(); });
    })());

    //get my works
    $ns.works = ((function(){
      var works;

      $.ajax({
          url           : './data/data.json'
        , async         : false
        , cache         : false
        , scriptCharset : 'utf-8'
        , dataType      : 'json'
        , success       : function(data){ works = data; }
        , error         : function(XMLHttpRequest, textStatus, errorThrown){
          console.log('could not get data');
          console.log(textStatus);
        }
      });

      return works;
    })());

  });

})());



/* ==================================== *
 * go to contents, regist contents      *
 * ==================================== */
((function(){

  var $ns = $leico.$global;

  $('body').bind('contents', function(){

    $('#leico')
    .queue(function(){

      var sel = $(this);
      var i = 0;

      sel.data('index', i).click( iconClick );

      ++ i;

      for( i ; i < $ns.works.length ; ++ i){

        sel.parent().prepend(
          $('<div>')
          .addClass('icon')
          .data('index', i)
          .append(
            $('<h3>').text( $ns.works[i].title )
          )
          .attr('id', $ns.works[i].title)
          .css({
              position    : sel.css('position')
            , top         : sel.offset().top
            , left        : sel.offset().left
          })
          .click( iconClick )
        );

      }

      sel.dequeue();
    })
    .delay(500)
    .queue(function(){

      $('div.icon').each(function(index, element){
        $(this).animate({left : (30 * (index + 1)) + '%'}, {duration : 1000});
      })

      $(this).dequeue();
    })

    
  });

  /* ========================================= *
   * iconClick(event)                          *
   * ========================================= */
  function iconClick(){

    var $ns = $leico.$global;

    var data = $ns.works[$(this).data('index')];
    switch(data.type){
      case 'image'   : setImage  ( $(this), data ); break;
      case 'html'    : setHtml   ( $(this), data ); break;
      case 'page'    : setPage   ( $(this), data ); break;
      case 'youtube' : setYoutube( $(this), data ); break;
    }

    $ns.scroll = $('#contents').scrollLeft();

    $('#contents')   .fadeOut(2000);
    $('#description').fadeOut(2000);

  }

  /* ========================================= *
   * setDescription(selector, data, position)  *
   * ========================================= */
  function setDescription(data){

    $('#description')
      .stop()
      .hide()
      .empty()
      .append(function(){
        if(data.description != null){
          return $('<section>')
            .append( $('<h3>').html  (data.title)       )
            .append( $('<p>') .append(data.description) )
        }
        return undefined;
      })
      .addClass('center')
      .fadeIn(600)
      .click(function(){
        $(this)
        .unbind('click')
        .fadeOut('fast', function(){
          $(this).empty();
        })
      });
  }
  /* ==================================== *
   * setYoutube(selector, data)           *
   * ==================================== */
  function setYoutube(sel, data){
    
    if(data.contents == null) return;

    var $ns = $leico.$global;

    $('#bg')
      .append(
        $(data.contents)
        .addClass('center')
        .hide()
        .stop()
        .fadeIn(5000)
      )
      .click(function(){
        
        $(this)
          .unbind('click')
          .children('iframe')
            .stop()
            .fadeOut(2000, function(){ $(this).remove(); })
          .end();

        $('#contents')
          .scrollLeft($ns.scroll)
          .fadeIn(500);

        setDescription(data);
      });
  }

  /* ==================================== *
   * setPage(selector, data)              *
   * ==================================== */

  function setPage(selector, data){
    
    if(data.contents == null) return;

    
    window.open(data.contents);


    var $ns = $leico.$global;

    $(window).focus(function(){
      $(this).unbind('focus');

      $('#contents')
        .scrollLeft($ns.scroll)
        .fadeIn(500);

      setDescription(data);

    })
  }


  /* ==================================== *
   * setHtml(selector, data)              *
   * ==================================== */
  function setHtml(sel, data){


    if(data.contents == null) return;

    var $ns = $leico.$global;

    $('#bg').append(
        $('<iframe>').attr({
            src         : data.contents
          , frameborder : '0'
          , seamless : 'seamless'
        })
        .addClass('center')
        .css({
            width  : '80%'
          , height : '80%'
        })
        .hide()
        .stop()
        .fadeIn(5000)
    )
    .click(function(){

      $(this).unbind('click')
        .children('iframe')
          .stop()
          .fadeOut(2000, function(){ $(this).remove(); })
        .end();

      $('#contents')
        .scrollLeft($ns.scroll)
        .fadeIn('fast', function(){});

      setDescription(data);

    });
    
  }


/* ==================================== *
 * setImage(selector, data)             *
 * ==================================== */
  function setImage(sel, data){

    if(data.contents == null) return;

    var $ns = $leico.$global;

    var bg =  data.contents + '/' + chooseImageSize() + '.' + data.imagetype;

    $('#bg').append(
      $('<div>')
        .addClass('center')
        .css({
            backgroundImage :  'url("' + bg + '")'
          , backgroundPosition : 'center center'
          , backgroundRepeat   : 'no-repeat'
          , backgroundSize     : 'contain'
          , backgroundColor    : '#000'
          , width  : '100%'
          , height : '100%'
        })
        .hide()
        .stop()
        .fadeIn(5000)
    )
    .click(function(){
      $(this)
        .unbind('click')
        .children('div')
          .stop()
          .fadeOut(2000, function(){ $(this).remove(); })
        .end();

      $('#contents')
        .scrollLeft($ns.scroll)
        .fadeIn('fast', function(){});

      setDescription(data);
    })
  }
})());



/* ==================================== *
 * chooseImageSize                      *
 * ==================================== */
function chooseImageSize(){
  var $ns = $leico.$global;
  var width = $ns.width;

  return ( (width > 2560) ? 5120 : (width > 1920) ? 2560 : 1920);
}

