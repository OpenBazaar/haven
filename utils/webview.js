export const cssCode = `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>img { max-width: 100%; } * { font-family: "arial"}</style>
`;

export const jsCode = `
  var imgs = document.getElementsByTagName("img");
  for(var i = 0; i < imgs.length; i++) {
    imgs[i].style.maxWidth='100%';
  }
`;
