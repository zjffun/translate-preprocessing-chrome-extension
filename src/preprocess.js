import recursivePreprocessNode from "./recursive-preprocess-node.js";
import defaultSettings from "./settings.js";

(function () {
  const settings =
    window.translatePreprocessingChromeExtensionSettings || defaultSettings;

  if (!settings.enablePreprocessing) {
    return;
  }

  const log = (info, ...args) => {
    if (settings.debugMode) {
      console.log(
        `[translate-preprocessing-chrome-extension]: ${info}`,
        ...args
      );
    }
  };

  if (!window.translatePreprocessingChromeExtensionPreprocessed) {
    window.translatePreprocessingChromeExtensionPreprocessed = true;

    if (settings.debugMode) {
      document.body.insertAdjacentHTML(
        "beforeend",
        "<!-- translatePreprocessingChromeExtensionPreprocessed -->"
      );
    }

    log("start preprocess");

    recursivePreprocessNode(document);

    log("end preprocess");
  }
})();
