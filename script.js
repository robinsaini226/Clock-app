"use strict";

const time_text = document.querySelector(".time");
const greet = document.querySelector(".greet");
const main = document.querySelector("main");
const btn = document.querySelector(".random-img");
const quote = document.querySelector(".random-quote");
const cite = document.querySelector(".cit");
const viewMore = document.querySelector(".view-more");
const viewMoretext = document.querySelector(".view-more-text");
const scrollToBtn = document.querySelector(".scroll-to");
const info = document.querySelector("#info");

const timezn = document.querySelector(".timezone");
const dayY = document.querySelector(".dayY");
const dayW = document.querySelector(".dayW");
const week = document.querySelector(".week");
// //smooth scrolling
// scrollToBtn.addEventListener('click',e=>{
//     // const cords=info.getBoundingClientRect();
//     info.scrollIntoView({behavior:'smooth'});

// });
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  }
//viewmore button
viewMore.addEventListener("click", () => {
  document.querySelector(".arrow").classList.toggle("rotate");
  if (viewMoretext.textContent === "M O R E") {
    viewMoretext.textContent = "L E S S";
    info.scrollIntoView({ behavior: "smooth" });
  } else {
    document.body.scrollIntoView({ behavior: "smooth" });
    viewMoretext.textContent = "M O R E";
  }
});

//random quote
const randomQuote = async function () {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  if (response.ok) {
    quote.textContent = data.content;
    cite.textContent = "-" + data.author;
  } else {
    quote.textContent = "An error occured";
    console.log(data);
  }
};
randomQuote();

setInterval(() => {
  let today = new Date();
  let hrs = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
  let time =
    hrs.toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0") +
    ":" +
    today.getSeconds().toString().padStart(2, "0");
  const html = `${time}`;
  time_text.innerHTML = html;

  today.getHours() < 12
    ? (greet.innerHTML = "🌞 Good Morning".toUpperCase())
    : today.getHours() >= 12 && today.getHours() <= 16
    ? (greet.innerHTML = "🌞 Good Afternoon".toUpperCase())
    : (greet.innerHTML = "🌜 Good Evening".toUpperCase());

  //location- time zone

  timezn.textContent = `${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  dayY.textContent = `${Math.floor(
    (Date.now() - Date.parse(new Date().getFullYear(), 0, 0)) / 86400000
  )}`;
  dayW.textContent = `${today.getDay()}`;
  week.textContent = `${today.getWeek()}`;
}, 500);
const url = "";
const randomImg = async function () {
  const response = await fetch(`https://source.unsplash.com/random/1600x900`);
  //   console.log(response.url);
  if (response.ok) {
    main.style.background = `URL("${response.url}")`;
    main.style.backgroundRepeat = "no-repeat";
    main.style.backgroundSize = "100% 100%";
    main.style.transition = "background 1000ms ease";
  } else {
    quote.textContent = "An error occured";
  }
};
randomImg();

setInterval(() => {
  randomImg();
  randomQuote();
}, 60000);

btn.addEventListener("click", () => {
  randomImg();
});

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
