const words = ["e.g", "i.e"];

export default function (str) {
  const _str = str
    .trim()
    .replace(/^[(“"]*/, "")
    .replace(/[)”";:,.?!]*$/, "");

  // number
  if (/^-?[0-9][0-9,\.]*$/.test(_str)) {
    return false;
  }

  if (words.includes(_str)) {
    return false;
  }

  return /[^a-zA-z’'\/]/.test(_str);
}
