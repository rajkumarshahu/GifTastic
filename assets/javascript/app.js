
let footballers = [
  "Pelé",
  "Diego Maradona",
  "Lionel Messi",
  "Zinedine Zidane",
  "Paolo Maldini",
  "Roberto Carlos",
  "Cristiano Ronaldo"
];

let displayPlayers = e => {
  console.log(e.target.innerText);
  var player = e.target.innerText;

  //console.log(player)

  // Here we are building the URL we need to query the database
  let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    player +
    "&api_key=QAX10ziVe8klE4BZUYXwoLf8uIyWHzQn&limit=10";

  // Here we run our AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(response => {
      console.log("Query URL: " + queryURL);
      let playersData = response.data;
      // Log the resulting object
      console.log("Response: " + playersData);

      playersData.forEach(player => {
        $("#images-view")
          .prepend(`<div class="card bg-info m-2 animated flip"><div class="card-header h4 ">Rating: ${
          player.rating
        }
       </div> <img class="img-thumbnail " src=${
        player.images.fixed_height_still.url
      } data-still= ${
        player.images.fixed_height_still.url
      } data-animate= ${
        player.images.fixed_height.url
      } data-state="still" ></div>`);
      });
    });
};

renderButtons = () => {
  $("#buttons-view").empty();
  footballers.forEach(footballer => {
    $("#buttons-view").append(
      `<button data-footballer=${footballer} type="button" class="footballer-btn btn btn-outline-light p-2 m-2">${footballer}</button>`
    );
  });

  // for (var i = 0; i < footballers.length; i++) {
  //   $("#buttons-view").append(
  //     `<button data-footballer=${footballers[i]} class=" footballer-btn btn btn-success p-2 m-2">${footballers[i]}</button>`);
  // }
};

$("#add-footballer").on("click", event => {
  event.preventDefault();
  let footballer = $("#footballer-input")
    .val()
    .trim();

  footballers.push(footballer);

  renderButtons();
});



 function switchState() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

};

renderButtons();
$(document).on("click", ".footballer-btn", displayPlayers);
$(document).on("click", ".img-thumbnail", switchState);
