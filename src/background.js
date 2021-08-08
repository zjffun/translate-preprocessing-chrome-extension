import preprocessPage from "./preprocess-page.js";

export async function handleBeforeRequest(details) {
  console.log("handleBeforeRequest", { details });
  preprocessPage();
}

const filter = {
  urls: ["*://translate.googleapis.com/translate_static/js/element/*"],
};

chrome.webRequest.onBeforeRequest.addListener(handleBeforeRequest, filter);
