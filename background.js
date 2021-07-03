async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function handleBeforeRequest(details) {
  console.log("handleBeforeRequest", { details });

  const currentTab = await getCurrentTab();

  chrome.scripting
    .executeScript({
      target: { tabId: currentTab.id },
      files: ["preprocessing.js"],
    })
    .then(function () {
      console.log("success preprocessing");
    })
    .catch(function (error) {
      console.error(error);
    });
}

const filter = {
  urls: ["*://translate.googleapis.com/translate_static/js/element/*"],
};

chrome.webRequest.onBeforeRequest.addListener(handleBeforeRequest, filter);
