let footballers = [
  "Pelé",
  "Diego Maradona",
  "Lionel Messi",
  "Zinedine Zidane",
  "Paolo Maldini",
  "Roberto Carlos",
  "Cristiano Ronaldo",
];

let displayPlayers = e => {
  let player = e.target.innerText;
  const API_KEY = "QAX10ziVe8klE4BZUYXwoLf8uIyWHzQn";

  // Building the URL to query the database
  let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    player +
    "&api_key=" +
    API_KEY +
    "&limit=10";

  // AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // storing all retrieved data in response object
    .then(response => {
      console.log("Query URL: " + queryURL);
      let playersData = response.data;
      playersData.forEach(player => {
        $("#images-view")
          .prepend(`<div class="card bg-info m-2 animated flip"><div class="card-header h4 ">Rating: ${
          player.rating
        }
       </div> <img class="img-thumbnail " src=${
         player.images.fixed_height_still.url
       } data-still= ${player.images.fixed_height_still.url} data-animate= ${
          player.images.fixed_height.url
        } data-state="still" ></div>`);
      });
    });
};

// This function generates buttons based on footballers name in footballers array
let renderButtons = () => {
  $("#buttons-view").empty();
  footballers.forEach(footballer => {
    $("#buttons-view").append(
      `<button data-footballer=${footballer} type="button" class="footballer-btn btn btn-outline-light p-2 m-2">${footballer}</button>`
    );
  });
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
  //console.log("state: "+state);
  if (state === "still") {
    console.log($(this).attr("src", $(this).attr("data-animate")));
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

renderButtons();
$(document).on("click", ".footballer-btn", displayPlayers);
$(document).on("click", ".img-thumbnail", switchState);
