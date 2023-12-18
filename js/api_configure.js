

"use strict";

/**
 * IMPORTS
 */
import { urlEncode } from "./utils/urlEncode.js";

// ! [DO NOT SHARE API_KEY in public]
const /** {String} */ API_KEY =
  "RAlYguudcPft4o5YzwKhsQ8kWPKzpyMWxBdhxhmD69ho58wwnrhS5uFx";

const /** FUNCTION */ headers = new Headers();
headers.append("Authorization", API_KEY);

const /** OBJECT */ requestOptions = { headers };

/**
 *  Fetch data from Pexels
 * @param {String} url Fetch URL
 * @param {Function} successCallback Success Callback function
 */
const fetchData = async function (url, successCallback) {
  const /** OBJECT */ response = await fetch(url, requestOptions);

  if (response.ok) {
    const /** OBJECT */ data = await response.json();
    successCallback(data);
  }
};

let /** STRING */ requestUrl = "";

const /** OBJECT */ root = {
  default: "https://api.pexels.com/v1/",
  videos: "https://api.pexels.com/videos/",
};

export const /** OBJECT */ client = {
  photos: {
    /**
     * SEarch photos
     * @param {object} parameters Url object
     * @param {string} callback Callback function
     */
    search(parameters, callback) {
      requestUrl = `${root.default}search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    /**
     * Curated photos
     * @param {object} parameters url object
     * @param {function} callback callback function
     */
    curated(parameters, callback) {
      fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
    },

    /**
     * GET single photo details
     * @param {string} parameters Photo id
     * @param {function} callback callback function
     */
    detail(id, callback) {
      fetchData(`${root.default}photos/${id}`, callback);
    },
  },

  videos: {
    /**
     * SEarch videos
     * @param {object} parameters Url object
     * @param {string} callback Callback function
     */
    search(parameters, callback) {
      requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    /**
     * GET Popular videos
     * @param {object} parameters url object
     * @param {function} callback callback function
     */
    popular(parameters, callback) {
      fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
    },

    /**
     * GET single video details
     * @param {string} parameters video id
     * @param {function} callback callback function
     */
    detail(id, callback) {
      fetchData(`${root.videos}videos/${id}`, callback);
    },
  },

  collections: {
    /**
     * Get featured collections
     * @param {object} parameters url object
     * @param {function} callback callback function
     */
    featured(parameters, callback) {
      requestUrl = `${root.default}collections/featured?${urlEncode(
        parameters
      )}`;
      fetchData(requestUrl, callback);
    },

    /**
     * GET a collection
     * @param {string} id Collection id
     * @param {object} parameters Url object
     * @param {function} callback callback function
     */
    detail(id, parameters, callback) {
      requestUrl = `${root.default}collections/${id}?${urlEncode(
        parameters
      )}`;
      fetchData(requestUrl, callback);
    },
  },
};
