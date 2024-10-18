export const renderDefs = (item) => {
  return ` <ul class="res-item__defenition">
         <li class="res-def"> - ${item.definition}</li>
      </ul>`;
};

export const getAllDef = (defs) => {
  //повертається масив строк -- тому джойнемо
  return defs.map((def) => renderDefs(def)).join("");
};

const renderRelatedWords = (item) => {
  return `${
    item.antonyms.length > 0 || item.synonyms.length > 0
      ? `
  <div class="res-item__related">
    ${item.antonyms.length > 0 ? "Antonyms: " + item.antonyms.join(", ") : ""}
    ${item.synonyms.length > 0 ? "Synonyms: " + item.synonyms.join(", ") : ""}
  </div>
`
      : ""
  }`;
};

export const renderItem = (item) => {
  return `<li class="res-item">
    <span class="res-item__part">${item.partOfSpeech}</span>
    <div class="res-item__defenitions">
      ${getAllDef(item.definitions)}
    </div>

${renderRelatedWords(item)}

  </li>`;
};
