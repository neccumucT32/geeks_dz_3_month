// // Regular expressions -регулярные выражения

// // flags - i, g, m, y
// // i - ignoreCase
// // g - global
// // m - multiLine

// Спецсимволы
//  \d = [0-9]

// const name = prompt()

// const regExp = /n/ig

// console.log(name(match(regExp)));

const numbers = "0123456789";

// const regExp = /[0-9]/g;

// const regExp = /\d/g;

// console.log(numbers.replace(regExp, "*"));

// console.log(numbers.match(regExp));

// PHONE CHECKER

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /\+996 [2579] [0-9] \d{2}-\d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = "OK";
    phoneResult.style.color = "green";
  } else {
    phoneResult.innerHTML = "not OK";
    phoneResult.style.color = "red";
  }
};

const button = document.getElementById("btn");

// TAB SLIDER DZ#3

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");
let currentTabIndex = 0;

const hideTabContent = () => {
  tabContentBlocks.forEach((block) => {
    block.style.display = "none";
  });
  tabs.forEach((tab) => {
    tab.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (id = 0) => {
  tabContentBlocks[id].style.display = "block";
  tabs[id].classList.add("tab_content_item_active");
};

hideTabContent();
showTabContent(currentTabIndex);

tabsParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabs.forEach((tab, tabIndex) => {
      if (event.target === tab) {
        hideTabContent();
        showTabContent(tabIndex);
        currentTabIndex = tabIndex;
      }
    });
  }
};

setInterval(() => {
  currentTabIndex = (currentTabIndex + 1) % tabs.length;
  hideTabContent();
  showTabContent(currentTabIndex);
}, 3000);

// somInput.oninput = () => {
//   const request = new XMLHttpRequest();
//   request.open("GET", "../data/converter.json");
//   request.setRequestHeader("Content-type", "application/json");
//   request.send();

//   request.onload = () => {
//     const data = JSON.parse(request.response);
//     usdInput.value = (somInput.value / data.usd).toFixed(2);
//   };
// };

// usdInput.oninput = () => {
//   const request = new XMLHttpRequest();
//   request.open("GET", "../data/converter.json");
//   request.setRequestHeader("Content-type", "application/json");
//   request.send();

//   request.onload = () => {
//     const data = JSON.parse(request.response);
//     somInput.value = (usdInput.value * data.usd).toFixed(2);
//   };
// };

// DRY - don`t repeat yourself
// KISS - keep it super simple, stupid

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const converter = (element, targetElements) => {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/converter.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);
      const usdRate = data.usd;
      const eurRate = data.eur;

      if (element.value === "") {
        targetElements.usd.value = "";
        targetElements.som.value = "";
        targetElements.eur.value = "";
      }

      if (element.id === "som") {
        targetElements.usd.value = (element.value / usdRate).toFixed(2);
        targetElements.eur.value = (element.value / eurRate).toFixed(2);
      }
      if (element.id === "usd") {
        targetElements.som.value = (element.value * usdRate).toFixed(2);
        targetElements.eur.value = (
          element.value *
          (eurRate / usdRate)
        ).toFixed(2);
      }
      if (element.id === "eur") {
        targetElements.som.value = (element.value * eurRate).toFixed(2);
        targetElements.usd.value = (
          element.value *
          (usdRate / eurRate)
        ).toFixed(2);
      }
    };
  };
};

converter(somInput, { usd: usdInput, eur: eurInput });
converter(usdInput, { som: somInput, eur: eurInput });
converter(eurInput, { som: somInput, usd: usdInput });

// card switcher

// const nextButton = document.querySelector("#btn-next");
// const prevButton = document.querySelector("#btn-prev");
// const cardBlock = document.querySelector(".card");

// let cardIndex = 0;

// nextButton.onclick = () => {
//   cardIndex++;
//   fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
//     .then((response) => response.json())
//     .then((data) => {
//       cardBlock.innerHTML = `
//     <p>${data.title}</p>
//     <p>${data.completed}</p>
//     <span>${data.id}</span>
//     `;
//     });
// };

// DZ№7

const nextButton = document.querySelector("#btn-next");
const prevButton = document.querySelector("#btn-prev");
const cardBlock = document.querySelector(".card");

let cardIndex = 1;
const maxCards = 200;

const fetchTodo = async (index) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${index}`
    );
    const data = await response.json();
    cardBlock.innerHTML = `
        <p>${data.title}</p>
        <p>${data.completed}</p>
        <span>${data.id}</span>
      `;
  } catch (e) {
    console.error(e);
    cardBlock.innerHTML = "";
  }
};
fetchTodo(cardIndex);

nextButton.onclick = () => {
  cardIndex = cardIndex < maxCards ? cardIndex + 1 : 1;
  fetchTodo(cardIndex);
};

prevButton.onclick = () => {
  cardIndex = cardIndex > 1 ? cardIndex - 1 : maxCards;
  fetchTodo(cardIndex);
};

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => {
//     if (!response.ok) throw new Error("Ошибка загрузки постов"); // Проверка ошибки
//     return response.json(); // Преобразуем ответ в JSON
//   })
//   .then((posts) => {
//     console.log("Список постов:", posts); // Выводим данные в консоль
//   })
//   .catch((error) => {
//     console.error("Ошибка:", error); // Логируем ошибки
//   });

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => {
//     return response.json();
//   })
//   .then((posts) => {
//     console.log("Список постов:", posts);
//   })
//   .catch((error) => {
//     console.log("Ошибка:", error);
//   });

// WEATHER
// query params = параметры запроса

const searchButton = document.querySelector("#search");
const searchInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const APP_ID = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

searchButton.onclick = () => {
  fetch(
    `${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric&lang=RU`
  )
    .then((response) => response.json())
    .then((data) => {
      city.innerHTML = data.name || "Город не найден";
      temp.innerHTML = `
        <span>
          ${data.main?.temp ? Math.round(data.main?.temp) + "&deg;C" : ""}
        </span>
       <img src="https://openweathermap.org/img/w/${
         data.weather[0].icon
       }.png" alt="img">
`;
    });
};

// //optional chaining - опциональная  цепочка
// //?.

// const address = {
//   id: 123,
//   street: {
//     // name: "Ibraimova",
//     number: 103,
//   },
// };
// console.log((address, street?.name));

//async await, try catch

// const url = "https://jsonplaceholder.typicode.com/posts/1";

// const getData = async () => {
//   try {
//     const response = await fetch(url);
//     const data = await response.json;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log("FINNALY !!!");
//   }
// };

// getData();
