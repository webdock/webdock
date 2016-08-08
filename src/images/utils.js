function formatImageId(imageId) {
  return imageId.replace(/sha256:/, '');
}

export default formatImageId;
