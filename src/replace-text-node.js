export default function (textNode, html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;

  const parentNode = textNode.parentNode;

  Array.from(temp.childNodes).forEach((node) => {
    parentNode.insertBefore(node, textNode);
  });

  parentNode.removeChild(textNode);
}
