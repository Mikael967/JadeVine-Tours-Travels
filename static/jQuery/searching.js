$(document).ready(function(){

  //Search service
  $("#schQryS").keyup(function(){
    $("#searchService .btnSub").css("display","none");
    $("#searchService .loading").fadeIn('fast');
    var srValue = ($("#schQryS").val()=='')?" ":$("#schQryS").val();
    var qry = "category="+srValue;
    var request = new XMLHttpRequest();
    request.open("POST","/search/",true);
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.onreadystatechange = function() {
      if (request.readyState !== 4 || request.status !== 200) return;
      $(".main-block .destinations table").html(request.responseText);
      $("#searchService .btnSub").fadeIn('fast');
      $("#searchService .loading").css("display","none");
    }
    request.send(qry);
  });
//-----------------********************------------------


//Search places, destinations & locations
$("#schQryP").keyup(function(){
  $("#schPlace .btnSub").css("display","none");
  $("#schPlace .loading").fadeIn('fast');
  var srValue = ($("#schQryP").val()=='')?" ":$("#schQryP").val();
  //var srCateg = $("#plcCateg").val();
  var qry = "place="+srValue;
  var request = new XMLHttpRequest();
  request.open("POST","/search-place/",true);
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if (request.readyState !== 4 || request.status !== 200) return;
    $(".main-block .destinations #table").html(request.responseText.substring(1));
    $("#schPlace .btnSub").fadeIn('fast');
    $("#schPlace .loading").css("display","none");
  }
  request.send(qry);
});
//-----------------********************------------------


//Search media in the gallery
$("#searchGall").keyup(function(){
  $("#gallSearch .btnSub").css("display","none");
  $("#gallSearch .loading").fadeIn('fast');
  var srValue = ($("#searchGall").val()=='')?" ":$("#searchGall").val();
  var qry = "gallery="+srValue;
  var request = new XMLHttpRequest();
  request.open("POST","/",true);
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if (request.readyState !== 4 || request.status !== 200) return;
    $("#wrapGallery").html(request.responseText);
    $("#gallSearch .btnSub").fadeIn('fast');
    $("#gallSearch .loading").css("display","none");
  }
  request.send(qry);
});
//-----------------********************------------------


//Submit testimonials to the database
$("#saveTest").submit(function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  formData.append('photo', $('#photo')[0].files[0]);

  $.ajax({
    type: 'POST',
    url: '/createTestimonial/',
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend: function() {
      $("#saveTest .subBtn").css("display","none");
      $("#saveTest .btnCancel").css("display","none");
      $("#saveTest .load").fadeIn('fast');
      $("#saveTest input").attr("disabled","disabled");
      $("#saveTest select").attr("disabled","disabled");
      $("#saveTest textarea").attr("disabled","disabled");
      $('#saveTest .formsms1').text("").css("display","none");
      $('#saveTest .formsms2').text("").css("display","none");
    }, success: function(response) {
      if (response.status == 1) {
        $('#saveTest')[0].reset();
        $('#saveTest .formsms1').text(response.message).fadeIn('fast').delay(5000).fadeOut('slow');
        $("#testimonialForm").animate({ scrollTop:0 }, "slow");
        //add testimonial to the list
        var container = document.querySelector('.columns testimonial');
        var testi = '<div class="test">';
        testi += '<img src="'+response.photo+'" alt="'+response.name+'">';
        testi += '<p><span>'+response.name+'</span>' +response.title+'-'+response.country+'</p>';
        testi += '<p>'+response.testimonial+'</p>';
        testi += '</div>';
        container.innerHTML += testi;
        
      } else {
        $('#saveTest .formsms2').text(response.message).fadeIn('fast').delay(5000).fadeOut('slow');
        $("#testimonialForm").animate({ scrollTop:0 }, "slow");
      }
      $("#saveTest .load").css("display","none");
      $("#saveTest .subBtn").fadeIn('fast');
      $("#saveTest .btnCancel").fadeIn('fast');
      $("#saveTest input").removeAttr("disabled","disabled");
      $("#saveTest select").removeAttr("disabled","disabled");
      $("#saveTest textarea").removeAttr("disabled","disabled");
    }
  });
});
//-----------------********************------------------

});
