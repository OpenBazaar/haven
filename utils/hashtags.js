export function getHashTags(inputText) {
  const regex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
  const matches = [];
  let match;


  while ((match = regex.exec(inputText))) {
    matches.push(match[0].slice(1));
  }

  return matches;
}
