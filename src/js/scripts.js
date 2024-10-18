import { BASE_URL } from "./constants.js";
import { renderItem } from "./renderFiles.js";
import { hideLoader, showLoader } from "./utils.js";

const input = document.getElementById("word-input");
const form = document.querySelector(".form");
const resWord = document.querySelector(".res-word");
const soundContainer = document.querySelector(".res-sound");
const list = document.querySelector(".res-list");
const results = document.querySelector(".results");
const error = document.querySelector(".error");

//*in order to value will be accessible
let data = {
  word: "",
  meanings: [],
  phonetics: [],
};

const handleResults = () => {
  results.style.display = "block"; //показуємо результати
  list.innerHTML = ""; //перед новим запросом очищуємо айтеми

  //*в залежності від того скільки значень/результатів ми знайшли, ми будемо їх додавати в ліст за допомогою виклику функції рендеру розмітки
  data.meanings.forEach((item) => (list.innerHTML += renderItem(item)));
};

const insertWord = () => {
  resWord.innerText =
    data.word + " " + data.phonetics[1].text.replace(/^\/(.*)\/$/, "[$1]");
  // resWord.innerText = data.phonetics[1].text;
};

const handleFindValue = (evt) => {
  const value = evt.target.value;
  //push the value to data
  data.word = value;
};

const handleSubmit = async (evt) => {
  evt.preventDefault();

  error.style.display = "none";

  if (!data.word.trim()) return; //if input is empty

  showLoader();

  try {
    const res = await fetch(`${BASE_URL}${data.word}`);
    const value = await res.json(); //response have json method which help unpack data from res if status = ok

    if (res.ok && value.length) {
      //кладемо дані щоб були доступні кругом (і лише перший елемент)
      const item = value[0];

      //копіємо глобальний об'єкт з даними
      data = {
        ...data,
        meanings: item.meanings,
        phonetics: item.phonetics,
      };

      insertWord();
      handleResults();
      hideLoader();

      input.value = "";
    } else if (res.status === 404) {
      error.style.display = "block";
      results.style.display = "none";
      input.value = "";
      hideLoader();
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSound = () => {
  //якщо взагалі шось є у phonetics
  if (data.phonetics.length) {
    const sound = data.phonetics[1];

    //*зробити окремо uk and us sound
    if (sound.audio) {
      new Audio(sound.audio).play();
    }
  }
};

input.addEventListener("keyup", handleFindValue);
form.addEventListener("submit", handleSubmit);
soundContainer.addEventListener("click", handleSound);

// const audioPlayer = document.getElementById("audioPlayer");

// soundContainer.addEventListener("click", () => {
//   if (data.phonetics.length) {
//     const sound = data.phonetics[0];
//     audioPlayer.src = sound.audio;
//     audioPlayer.play();
//   }
// });
