(function(){
  
  var choices = []
    , roygbiv = [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ]
    ;

  // First level
  choices.push (
    
    [ 3, 6, 7, 4 ] );

  // Second level
  choices.push (
    
    [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black' ] );

  
  function liTpl( level, label, idx ){
    return $( '<li class="cootielevel' + level + '">'
            + label 
            + '</li>').css( 'background-color', roygbiv[idx] );
  }

  function picknumber(){
    var cooties = $('<ol id="cooties" />').appendTo('#main');
    
    choices[0].forEach( function( choice, idx ){
      liTpl ( 1, choice, idx ).appendTo ( cooties ).click( 
        function(){ 
          var i = +($(this).html())
          pickcolor(i);
        });
    });
  }


  function pickcolor( iterations, lastcall ){

    var from = (iterations % 2) ? 0 : 3
      , to = from + 3
      , cooties = $("#cooties").empty()
      ;
    
    for (var i = from; i <= to; i++ ){
      
      liTpl ( 2, choices[1][i], i )
        .appendTo ( cooties )
        .click ( function(){ 
          var colorLength = $(this).html().length;
          
          if (lastcall){ getcootie(); }
          else { pickcolor( colorLength, true ); }
        });
    
    }
  }
  function cootieTpl( result ){
    // from_user
    // profile_image_url
    // text
    
    return $( '<h1>' + result.text + '</h1>'
            + '<h2>' + result.from_user + '</h2>'
            + '<img src="' + result.profile_image_url + '">' );

  }
  
  function showcootie(data){

    if (data && data.results){
      var random = Math.floor(Math.random() * data.results.length)
        , cootie = data.results[random];
    
      cootieTpl( cootie ).appendTo ( $("#answer") );
    }
  }
  
  function getcootie(){  
    var searchurl = "http://search.twitter.com/search.json?q=%23cootiecatchr&callback=?"
    $.getJSON( searchurl, showcootie );
  }

  $(function(){
    
    picknumber();
  
  });
  
  
}());