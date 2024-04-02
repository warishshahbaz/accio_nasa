const API_KEY = `Yd6woaJkeSujtHY6I409tOJG0Jrtp2cCptQcKwDF`;

const container = document.getElementById("display_box");
const hsitory = document.getElementById("history_search");
// localStorage.setItem("timeDate", []);
// current date format
const currentDate = new Date().toISOString().split("T")[0];

// DATE validation

window.onload = function () {
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("date").setAttribute("max", today);
};

async function getCurrentImageOfTheDay(date) {
  console.log(date, "--------------date");
  try {
    let res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=${date}`
    );
    let data = await res.json();

    container.innerHTML = createElement(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

let box = [];
// search
function handleSearch() {
  let newDate = document.getElementById("date").value;
  box.push(newDate);
  localStorage.setItem("timeDate", JSON.stringify(box));

  getCurrentImageOfTheDay(newDate);
  document.getElementById("header").innerHTML = `NASA Picture of ${newDate}`;
  renderHistoryList();
  console.log(box, "box");
}

// initialize
getCurrentImageOfTheDay(currentDate);

function createElement(data) {
  return `
  
            <img src=${data.url} alt="nasa picture" />
            <h4>${data.title}</h4>
            <p>${data.explanation}</p>
    `;
}

function renderHistoryList() {
  const localData = JSON.parse(localStorage.getItem("timeDate"));

  hsitory.innerHTML = localData
    ?.map((val) => {
      return ` <li onclick="getCurrentImageOfTheDay('${val}')" >${val}</li>`;
    })
    .join("");
}
