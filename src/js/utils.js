const loading = document.querySelector(".loader");

export const showLoader = () => {
  loading.style.display = "flex";
};

export const hideLoader = () => {
  loading.style.display = "none";
};
