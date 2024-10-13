import { BASE_URL } from "./constants.js";

const input = document.getElementById("word-input");
const form = document.querySelector(".form");
const resWord = document.querySelector(".res-word");

//*in order to value will be accessible
let data = {
  word: "",
};

const insertWord = () => {
  resWord.innerText = data.word;
};

const handleFindValue = (evt) => {
  const value = evt.target.value;
  //push the value to data
  data.word = value;
};

const handleSubmit = async (evt) => {
  evt.preventDefault();

  if (!data.word.trim()) return; //if input is empty

  try {
    const res = await fetch(`${BASE_URL}${data.word}`);
    const value = await res.json(); //response have json method which help unpack data from res if status = ok

    if (res.ok && value.length) {
      insertWord();
    }
  } catch (error) {
    console.log(error);
  }
};

input.addEventListener("keyup", handleFindValue);
form.addEventListener("submit", handleSubmit);
