//general shared functionality in this file

function initializeWebApp() {
    if (process.env.NODE_ENV === 'production') {
        require("offline-plugin/runtime").install();
    }
}

export default { initializeWebApp };