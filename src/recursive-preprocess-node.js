import isCode from "./is-code.js";
import replaceTextNode from "./replace-text-node";

function escape(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isSkipNode(node) {
  const allowNodes = [Node.ELEMENT_NODE, Node.TEXT_NODE, Node.DOCUMENT_NODE];
  const skipTags = ["SCRIPT", "STYLE", "CODE"];
  const skipAttrs = Object.entries({
    translate: "no",
  });

  if (!allowNodes.includes(node.nodeType)) {
    return true;
  }

  if (skipTags.includes(node.tagName)) {
    return true;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    for (const [name, value] of skipAttrs) {
      if (node.getAttribute(name) === value) {
        return true;
      }
    }
  }

  return false;
}

export default function recursivePreprocessNode(node) {
  if (isSkipNode(node)) {
    return;
  }

  if (node.tagName === "PRE") {
    node.setAttribute("translate", "no");
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const textContent = node.textContent;

    if (!textContent.trim()) {
      return;
    }

    const contents = textContent
      .split(" ")
      .map((d) => d.split("&nbsp;"))
      .flat();

    contents.forEach((content, i) => {
      const subcontents = content.split("\n");
      subcontents.forEach((c, j) => {
        if (isCode(c)) {
          subcontents[j] = `<font translate="no">${escape(c)}</font>`;
        }
      });
      contents[i] = subcontents.join("\n");
    });

    let html = contents.join(" ");

    replaceTextNode(node, html);
    return;
  }

  for (let i = 0; i < node.childNodes.length; i++) {
    const _node = node.childNodes.item(i);
    recursivePreprocessNode(_node);
  }
}
