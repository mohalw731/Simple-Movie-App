const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

const API_BASE_URL = "https://www.omdbapi.com/?t=";

const renderMovie = (data) => {
  const movieData = `
    <div class="info">
        <img src=${data.Poster} class="poster">
        <div>
            <h2>${data.Title}</h2>
            <div class="rating">
                <img src="star-icon.svg">
                <h4>${data.imdbRating}</h4>
            </div>
            <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
            </div>
            <div class="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
            </div>
        </div>
    </div>
    <h3>Plot:</h3>
    <p>${data.Plot}</p>
    <h3>Cast:</h3>
    <p>${data.Actors}</p>
    
`;

  result.insertAdjacentHTML("beforeend", movieData);
};

const clickHandler = async () => {
  try {
    const userInput = movieNameRef.value;
    const res = await fetch(`${API_BASE_URL}=${userInput}&apikey=4bf61606`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.description);
    } else if (userInput === "") {
      alert("Enter movie name");
    } else {
      result.innerHTML = "";
      renderMovie(data);
    }
  } catch (error) {
    result.innerHTML = `<h3 class="msg">${error}</h3>`;
  }
};

searchBtn.addEventListener("click", clickHandler);
