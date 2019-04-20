$(document).ready(function() {
    //search topics
    var topics = [];
  
       function display() {
    
      var search = $(this).data("search");
      console.log(search);
    //adding the queryURL
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
    //test for results
      console.log(queryURL);
    //sending a GET ajax call to the queryURL
      $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
              var results = response.data;
              console.log(results);
              for (var i = 0; i < results.length; i++) {
              
              var selection = $("<div class='col-md-4'>");
    //assigning results to search for ratings
              var rating = results[i].rating;
              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;
              var image = $("<img>");
              var ratingResult = $("<p>").text("Rating: " + rating);


    //adding classes to play and pause the GIF animations
              image.attr("src", still);
              image.addClass("giphy");
              image.attr("data-state", "still");
              image.attr("data-still", still);
              image.attr("data-animate", animated);
              selection.append(ratingResult);
              selection.append(image);
              $("#gif").prepend(selection);
    
            }
      });
    }
    
      //search results and adding result to create new button
      $("#addTopic").on("click", function(event) {
            event.preventDefault();
            var newSearch = $("#input").val().trim();
            topics.push(newSearch);
            console.log(topics);
            $("#input").val('');
            displayButtons();
          });
    
      
          //searches through button and adds it to the html page
      function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var newButton = $('<button class="btn btn-danger">');
          newButton.attr("id", "topic");
          newButton.attr("data-search", topics[i]);
          newButton.text(topics[i]);
          $("#myButtons").append(newButton);
        }
      }
  
      displayButtons();
    
      //displays gifs
      $(document).on("click", "#topic", display);
    
      //play or pause
      $(document).on("click", ".giphy", play);
    
      //still or animate
      function play() {
         var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });