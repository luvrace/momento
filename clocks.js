const clock = document.querySelector(".js-clock");

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  clockTitle.innerHTML = time;
  return;
}

function init() {
  getTime();
}

init();