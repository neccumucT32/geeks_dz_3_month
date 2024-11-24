const cardsContainer = document.querySelector(".cards");

const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    renderCards(data);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    cardsContainer.innerHTML = "Ошибка";
  }
};

const renderCards = (data) => {
  cardsContainer.innerHTML = "";

  data.forEach((post) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="https://avatars.mds.yandex.net/i?id=a095c0454fca3efdcd80b56fdf7129ae_l-4230485-images-thumbs&n=13" alt="Image">
      <div class="card-content">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
};

fetchPosts();
