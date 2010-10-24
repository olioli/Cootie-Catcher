(function(){

  function showcootie(data){
    if (data && data.results){
      var random = Math.floor( Math.random() * data.results.length )
        , cootie = data.results[random];
              
      $( '<p>'
       + '<a href="http://twitter.com/' + cootie.from_user + '">'
       + '<img class="avatar" src="' + cootie.profile_image_url + '">'
       + '</a>'
       + cootie.text 
       + '</p>').hide().appendTo( $('#answer') ).fadeIn(125);
    }
  }
  
  function getcootie(){  
    var searchurl = "http://search.twitter.com/search.json?q=%23cootiecatchr&result_type=mixed&callback=?"
    $.getJSON( searchurl, showcootie );
  }
  
  $(function(){
    
    function crunch(idx){ $('#sound'+idx)[0].play(); }

    $('<audio id="sound1"/>').attr('src', 'audio/paper1.ogg').appendTo("body")[0].load();
    $('<audio id="sound2"/>').attr('src', 'audio/paper2.ogg').appendTo("body")[0].load();

    $('img.step-4').click( function(){ $("#answer *").fadeOut(2000).remove(); } );  
    $('img.step-3').click( getcootie );
    
    $('img.step-0').click(function(){ crunch(1); });
    $('img.step-1').click(function(){ crunch(1); });
    $('img.step-2').click(function(){ crunch(2); });
    $('img.step-3').click(function(){ crunch(2); });

  });
  
}());