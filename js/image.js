$(function () {
    "use strict";
    
    $(".popup img").click(function () {
        var $src = $(this).attr("src");
        $(".show").fadeIn();
        $(".img-show img").attr("src", $src);
    });
    
    $("span, .overlay").click(function () {
        $(".show").fadeOut();
    });
    
});


$(document).ready(function() {

	$('.open-form').click(function() {
		$('.form-popup').show();
	});
	$('.close-form').click(function() {
		$('.form-popup').hide();
	});
  
	$('.reset-form').click(function() {
		$('.success-message').show();
    $('#my-form').trigger( 'reset' );

    setTimeout(function() {
	    $('.success-message').hide()
    }, 1500);
	});

	$(document).mouseup(function(e) {
		var container = $(".form-wrapper");
		var form = $(".form-popup");

		if (!container.is(e.target) && container.has(e.target).length === 0) {
			form.hide();
		}
	});


});


window.onload = function() {
	var img = document.getElementById('img');
	var container = document.getElementById('container');
	var showImage = function showImage() {
	  img.style.display = "inline";
	  container.style.backgroundImage = "";
	};
	img.addEventListener('load', showImage);
	img.addEventListener('error', showImage);
	var thumbs = document.getElementsByClassName('thumb');
	for (var i = 0, z = thumbs.length; i < z; i++) {
	  var thumb = thumbs[i];
	  var handler = (function(t) {
		return function clickThumb() {
		  container.style.backgroundImage = "url('img/Loading.gif')";
		  img.style.display = "none";
		  img.src = t.dataset['image'];
		};
	  })(thumb);
	  thumb.addEventListener('click', handler);
	}
  };