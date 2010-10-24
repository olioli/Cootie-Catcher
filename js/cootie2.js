(function(){
  
  var cooties = null
    , originalCooties = null;

  Array.prototype.random = function(){
    return this[Math.floor(Math.random() * this.length)];
  };
  
  Array.prototype.shuffle = function(){
    this.sort( function() { return 0.5 - Math.random(); } );
    return this;
  };
  
  Array.prototype.clone = function(){
    return this.slice(0);
  }

  function showcootie(){
    if (cooties && cooties.length){      
      var cootie = cooties.random()
        , idx = cooties.indexOf(cootie);
              
      $( '<p>'
       + '<a href="http://twitter.com/' + cootie.from_user + '">'
       + '<img class="avatar" src="' + cootie.profile_image_url + '">'
       + '</a>'
       + cootie.text 
       + '</p>').hide().appendTo( $('#answer') ).fadeIn(125);
      
      // Remove the already viewed cootie.
      cooties.splice(idx, 1);
      
      // Fill up the cootie jar?
      if (!cooties.length) cooties = originalCooties.clone().shuffle();
    }
  }

  $(function(){

    // Start here.
    var searchurl = "http://search.twitter.com/search.json?q=%23cootiecatchr&result_type=mixed&rpp=25&callback=?"
    $.getJSON( searchurl, function(data){ 
      originalCooties = data.results;
      cooties = originalCooties.clone().shuffle();
    });
    
  	$(".cootiecatchers img").click(function() {
  		var next = (parseInt($(this).hide().attr("data-step"))+1)%5;
  		$(".step-"+next).show();
  	})
	      
    function crunch(idx){ $('#sound'+idx)[0].play(); }

    $('<audio id="sound1"/>').attr('src', 'audio/paper1.ogg').appendTo("body")[0].load();
    $('<audio id="sound2"/>').attr('src', 'audio/paper2.ogg').appendTo("body")[0].load();

    $('img.step-4').click( function(){ $("#answer").empty() } );
        
    $('img.step-0').click(function(){ crunch(1); });
    $('img.step-1').click(function(){ crunch(1); });
    $('img.step-2').click(function(){ crunch(2); });
    $('img.step-3').click(function(){ 
      crunch(2); 
      showcootie();
    });
  });
  
  
}());