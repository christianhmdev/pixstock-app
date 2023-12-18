
"use strict";

// IMPORTS
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { videoCard } from "../../js/video_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";

// Show filter bar if searched anything
const $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";

//
// Init filter
//
const $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach(($filterWrapper) => {
  filter($filterWrapper, window.filterObj, (newObj) => {
    // console.log(newObj);
    window.filterObj = newObj;
    updateUrl(newObj, "videos");
  });
});

//
// Render Popular or searched videos
// if searched something then render searched videos
// or else render Popular videos
//
const $videoGrid = document.querySelector("[data-video-grid]");
const $title = document.querySelector("[data-title]");
const videoGrid = gridInit($videoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} videos` : "Popular videos";

$title.textContent = title;
document.title = title;

//
// Render all videos
// parameters - (Number) currentPage Current page number
const renderVideos = function (currentPage) {
  client.videos[searchObj ? "search" : "popular"](
    {
      ...searchObj,
      per_page: perPage,
      page: currentPage,
    },
    (data) => {
      //   console.log(data);
      totalPage = Math.ceil(data.total_results / perPage);

      data.videos.forEach((video) => {
        const $videoCard = videoCard(video);

        updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
      });

      //  when videos loaded
      isLoaded = true;

      // when no more videos found, hide loader
      if (currentPage >= totalPage) {
        $loader.style.display = "none";
      }
    }
  );
};

renderVideos(currentPage);

// Load more videos
const $loader = document.querySelector("[data-loader]");
let isLoaded = true;

window.addEventListener("scroll", function () {
  // console.log($loader.getBoundingClientRect().top);

  if (
    $loader.getBoundingClientRect().top < window.innerHeight * 2 &&
    currentPage <= totalPage &&
    isLoaded
  ) {
    currentPage++;
    renderVideos(currentPage);
    isLoaded = false;
  }
});
