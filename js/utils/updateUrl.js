

"use strict";

/**
 * IMPORTS
 */
import { urlEncode } from "./urlEncode.js";

/**
 * Update url
 * @param {Object} filterObj Filter Object
 * @param {*} searchType Search Type eg. 'videos' or 'photos'
 */

export const updateUrl = (filterObj, searchType) => {
    setTimeout(() => {
        const /** STRING */ root = window.location.origin;
        const /** STRING */ searchQuery = urlEncode(filterObj);

        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
    }, 500);
}