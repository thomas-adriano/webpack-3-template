"use-strict";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
//general shared functionality in this file

function initializeWebApp() {
    OfflinePluginRuntime.install();
}

export default { initializeWebApp };