const form = document.querySelector("form");
const gallery = document.getElementById("gallery");

const localstorage = {
  set: (value) => {
    localStorage.setItem("gallery", JSON.stringify(value));
  },
  get: () => {
    return JSON.parse(localStorage.getItem("gallery"));
  },
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const file = document.getElementById("file").files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    const gallery = localstorage.get() || [];
    gallery.push({
      name: name,
      image: reader.result,
      id: Date.now(),
    });
    localstorage.set(gallery);

    renderGalllery();

    document.getElementById("name").value = "";
    document.getElementById("file").value = "";
  };
});

function deleteImage(id) {
  const gallery = localstorage.get() || [];
  const newGallery = gallery.filter((e) => e.id !== id);
  localstorage.set(newGallery);
  renderGalllery();
}

function renderGalllery() {
  gallery.innerHTML = "";
  const imgs = localstorage.get() || [];
  imgs.forEach((e) => {
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const btn = document.createElement("button");
    const imgContainer = document.createElement("div");

    img.src = e.image;
    img.alt = e.name;

    h2.textContent = e.name;

    btn.innerText = "Delete";
    btn.addEventListener("click", () => deleteImage(e.id));

    imgContainer.appendChild(img);
    imgContainer.appendChild(h2);
    imgContainer.appendChild(btn);

    gallery.appendChild(imgContainer);
  });
}

renderGalllery();
