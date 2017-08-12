function initializeWebApp() {
    require("offline-plugin/runtime").install();
    require("moment").locale('en-US');
}

export default { initializeWebApp };
