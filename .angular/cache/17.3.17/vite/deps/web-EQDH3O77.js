import {
  WebPlugin
} from "./chunk-MEMPWAYY.js";
import {
  __async
} from "./chunk-WDMUDEB6.js";

// node_modules/@capacitor/screen-orientation/dist/esm/web.js
var ScreenOrientationWeb = class extends WebPlugin {
  constructor() {
    super();
    if (typeof screen !== "undefined" && typeof screen.orientation !== "undefined") {
      screen.orientation.addEventListener("change", () => {
        const type = screen.orientation.type;
        this.notifyListeners("screenOrientationChange", { type });
      });
    }
  }
  orientation() {
    return __async(this, null, function* () {
      if (typeof screen === "undefined" || !screen.orientation) {
        throw this.unavailable("ScreenOrientation API not available in this browser");
      }
      return { type: screen.orientation.type };
    });
  }
  lock(options) {
    return __async(this, null, function* () {
      if (typeof screen === "undefined" || !screen.orientation || !screen.orientation.lock) {
        throw this.unavailable("ScreenOrientation API not available in this browser");
      }
      try {
        yield screen.orientation.lock(options.orientation);
      } catch (_a) {
        throw this.unavailable("ScreenOrientation API not available in this browser");
      }
    });
  }
  unlock() {
    return __async(this, null, function* () {
      if (typeof screen === "undefined" || !screen.orientation || !screen.orientation.unlock) {
        throw this.unavailable("ScreenOrientation API not available in this browser");
      }
      try {
        screen.orientation.unlock();
      } catch (_a) {
        throw this.unavailable("ScreenOrientation API not available in this browser");
      }
    });
  }
};
export {
  ScreenOrientationWeb
};
//# sourceMappingURL=web-EQDH3O77.js.map
