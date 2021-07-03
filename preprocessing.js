(function () {
  const codeReg = /^(\$.*|-[\w-]*)$/;
  const defaultEnableLog = true;

  const log = (...args) => {
    if (window["page-translate-preprocessing-chrome-extension-enablelog"]) {
      console.log(...args);
    }
  };

  if (!window["page-translate-preprocessing-chrome-extension-preprocessing"]) {
    window["page-translate-preprocessing-chrome-extension-enablelog"] =
      defaultEnableLog;
    window[
      "page-translate-preprocessing-chrome-extension-preprocessing"
    ] = true;

    log("start page-translate-preprocessing-chrome-extension preprocessing");

    Array.from(document.querySelectorAll("*")).forEach((el) => {
      if (el.tagName === "PRE") {
        el.setAttribute("translate", "no");
        return;
      }
      if (codeReg.test(el.textContent.trim())) {
        el.setAttribute("translate", "no");
        return;
      }
    });

    log("end page-translate-preprocessing-chrome-extension preprocessing");
  }
})();
