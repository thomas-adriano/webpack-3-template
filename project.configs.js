/**
 * This script gathers all project related configurations. 
 * Besides properties, it also homes some utility function such as getRootRelativePath.
 * 
 * All paths must be absolute, the appendRootPath can be used to facilitate this.
 */

const path = require("path");

const ROOT_PATH = __dirname;
const BUILD_PATH = appendRootPath("build");
const INDEX_JS_PATH = appendRootPath("src/index/index.js");
const INDEX_HTML_PATH = appendRootPath("src/index/index.html");
const FAVICON_PATH = appendRootPath("assets/favicon/js.png");
const INLINE_ASSETS_MAX_SIZE_IN_BYTES = 5000;
const APP_TITLE = "Webpack 3 Template";
const PUBLIC_PATH = "";
const DEV_SERVER_PORT = 8081;
const DEV_SERVER_HOST = "0.0.0.0";

module.exports = {
    getRootRelativePath,
    ROOT_PATH,
    BUILD_PATH,
    INLINE_ASSETS_MAX_SIZE_IN_BYTES,
    INDEX_HTML_PATH,
    INDEX_JS_PATH,
    APP_TITLE,
    FAVICON_PATH,
    DEV_SERVER_PORT,
    DEV_SERVER_HOST
};

/**
  * Given an absolute filesystem path, returns the path relative to the root path.
  * The root path can be defines with the property ROOT_PATH.
  * 
  * @param {string} strPath absolute filesystem path
  * @returns path relative to the root path
  */
function getRootRelativePath(strPath) {
    return strPath.replace(normalizePath(ROOT_PATH), "");
}

function appendRootPath(childPath) {
    return path.join(ROOT_PATH, childPath);
}

function normalizePath(strPath) {
    const lastPathSeparatorIndex = strPath.lastIndexOf(path.sep);
    const hasTrailingSlash = lastPathSeparatorIndex === strPath.length - 1;
    if (hasTrailingSlash) {
        return strPath;
    }
    return strPath + path.sep;
}
