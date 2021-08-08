import getCurrentTab from "./get-current-tab.js";
import preprocessPage from "./preprocess-page.js";
import getSettings from "./settings.js";

function getElByName(name) {
  return document.querySelector(`[name="${name}"]`);
}

const enablePreprocessingEl = getElByName("enable-preprocessing");

const enablePreprocessingCodeEl = getElByName("enable-preprocessing-code");

const debugModeEl = getElByName("debug-mode");

const preprocessPageEl = document.querySelector("#preprocessing-page");

const highlightResultEl = document.querySelector("#highlight-result");

chrome.storage.sync.get(
  ["enablePreprocessing", "enablePreprocessingCode", "debugMode"],
  function (storedSettings) {
    const settings = getSettings(storedSettings);

    enablePreprocessingEl.checked = settings.enablePreprocessing;
    enablePreprocessingCodeEl.checked = settings.enablePreprocessingCode;
    debugModeEl.checked = settings.debugMode;
  }
);

enablePreprocessingEl.addEventListener("change", (e) => {
  chrome.storage.sync.set({ enablePreprocessing: e.target.checked });
});

enablePreprocessingCodeEl.addEventListener("change", (e) => {
  chrome.storage.sync.set({ enablePreprocessingCode: e.target.checked });
});

debugModeEl.addEventListener("change", (e) => {
  chrome.storage.sync.set({ debugMode: e.target.checked });
});

preprocessPageEl.addEventListener("click", () => {
  preprocessPage({ preprocessed: false });
});

highlightResultEl.addEventListener("click", async () => {
  const currentTab = await getCurrentTab();

  chrome.scripting
    .insertCSS({
      target: { tabId: currentTab.id },
      files: ["highlight.css"],
    })
    .then(function () {
      console.log("success highlight result");
    })
    .catch(function (error) {
      console.error(error);
    });
});
