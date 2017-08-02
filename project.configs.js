const path = require("path");

const ROOT_PATH = path.resolve('.');
const BUILD_PATH = path.join(ROOT_PATH, 'build');
const INDEX_JS_PATH = path.join(ROOT_PATH, 'src/index/index.js');
const INDEX_HTML_PATH = path.join(ROOT_PATH, 'src/index/index.html');
const FAVICON_PATH = path.join(ROOT_PATH, 'assets/favicon/js.png');
const INLINE_ASSETS_MAX_SIZE_IN_BYTES = 10000;
const APP_TITLE = "Webpack 3 Template";
const PUBLIC_PATH = "";
const DEV_SERVER_PORT = 8081;
const DEV_SERVER_HOST = "0.0.0.0"

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
}

function normalizePath(strPath) {
    const lastPathSeparatorIndex = strPath.lastIndexOf(path.sep);
    const hasTrailingSlash = lastPathSeparatorIndex === (strPath.length - 1)
    if (hasTrailingSlash) {
        return strPath;
    }
    return strPath + path.sep;
}

function getRootRelativePath(strPath) {
    return strPath.replace(normalizePath(ROOT_PATH), "");
}