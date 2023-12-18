
"use strict";

/**
 * IMPORTS
 */
import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";

/**
 * CREATE PHOTO CARD
 * @param {Object} photo Photo object
 * @returns Photo card
 */
export const photoCard = (photo) => {
  const /** STRING */ root = window.location.origin;
  // console.log(photo);

  const {
    alt,
    avg_color: backdropColor,
    width,
    height,
    id,
    src: { large },
  } = photo;

  const /** NodeElement */ $card = document.createElement("div");
  $card.classList.add("card", "grid-item");
  $card.style.backgroundColor = backdropColor;

  const /** Object */ favoriteObj = JSON.parse(
    window.localStorage.getItem("favorite")
  );

  $card.innerHTML = `
    <figure class="card-banner" style="--width: ${width}; --height: ${height};">
        <img src="${large}" width="${width}" height="${height}" loading="lazy" alt="${alt}"
        class="img-cover">
    </figure>

    <div class="card-content">

        <button class="icon-btn small ${favoriteObj.photos[id] ? "active" : ""
    }" aria-labelledby="Add to favorite" data-ripple data-favorite-btn>
          <span class="material-symbols-outlined leading-icon" aria-hidden="true">favorite</span>

          <div class="state-layer"></div>
        </button>

    </div>

    <a href="${root}/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
  `;

  const /** NodeElement */ $cardBanner = $card.querySelector("img");
  $cardBanner.style.opacity = 0;

  $cardBanner.addEventListener("load", function () {
    this.animate(
      {
        opacity: 1,
      },
      { duration: 400, fill: "forwards" }
    );
  });

  const /** NodeList */ $rippleElems = [
    $card,
    $card.querySelector("[data-ripple]"),
  ];

  $rippleElems.forEach(($rippleElem) => ripple($rippleElem));

  const /** NodeElement */ $favoriteBtn = $card.querySelector(
    "[data-favorite-btn]"
  );
  favorite($favoriteBtn, "photos", id);

  return $card;
};
