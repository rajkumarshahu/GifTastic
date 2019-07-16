`use strict`;

let footballers = [
  "Pelé",
  "Diego Maradona",
  "Lionel Messi",
  "Johan Cruyff",
  "Alfredo Di Stéfano",
  "Ferenc Puskás",
  "Franz Beckenbauer",
  "Zinedine Zidane",
  "Paolo Maldini",
  "Michel Platini",
  "Garrincha",
  "Gerd Müller",
  "Zico",
  "Cafu",
  "Cristiano Ronaldo",
];

let displayPlayers= (e)=>{
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
        $("#images-view").prepend(`<div class="card"><div class="card-header h4 ">Rating: ${player.rating}
        <img class="card bg-light" src=${player.images.fixed_height.url}></div></div>`);
        $("#images-view").prepend(``);

      });
    });
};
