import getCurrentTab from "./get-current-tab.js";
import getSettings from "./settings.js";

export default async function ({ preprocessed } = {}) {
  const currentTab = await getCurrentTab();

  chrome.storage.sync.get(
    ["enablePreprocessing", "enablePreprocessingCode", "debugMode"],
    (storedSettings) => {
      const settings = getSettings(storedSettings);

      chrome.scripting
        .executeScript({
          target: { tabId: currentTab.id },
          args: [settings, preprocessed === undefined ? null : preprocessed],
          func: (settings, preprocessed) => {
            window.translatePreprocessingChromeExtensionSettings = settings;
            if (preprocessed !== null) {
              window.translatePreprocessingChromeExtensionPreprocessed =
                preprocessed;
            }
          },
        })
        .then(function () {
          console.log("success set preprocessing settings");

          chrome.scripting
            .executeScript({
              target: { tabId: currentTab.id },
              files: ["preprocess.js"],
            })
            .then(function () {
              console.log("success preprocessing");

              chrome.action.setIcon({
                tabId: currentTab.id,
                path: "images/icon128-active.png",
              });
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  );
}
