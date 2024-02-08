export const extractAndRemoveImageTag = (inputString) => {
  const imageUrlRegex = /<img\s+[^>]*src=([^ >]+)[^>]*>/;
  const match = inputString.match(imageUrlRegex);
  let imageUrl = null;
  if (match) {
    imageUrl = match[1];
  }
  const imgTagRegex = /<img\s+[^>]*src=[^ >]+[^>]*>/g;
  const resultString = inputString.replace(imgTagRegex, '');
  return {
    imageUrl: imageUrl,
    updatedString: resultString,
  };
};
