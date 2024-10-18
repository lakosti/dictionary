export const renderDefs = (item) => {
  return ` <ul class="res-item__defenition">
         <li class="res-def"> - ${item.definition}</li>
      </ul>`;
};

export const getAllDef = (defs) => {
  //повертається масив строк -- тому джойнемо
  return defs.map((def) => renderDefs(def)).join("");
};

export const renderItem = (item) => {
  return `<li class="res-item">
    <span class="res-item__part">${item.partOfSpeech}</span>
    <div class="res-item__defenitions">
      ${getAllDef(item.definitions)}
    </div>
  </li>`;
};
