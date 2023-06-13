export const isValidImageFileType = (file) => {
  const validExtensions = ["png", "jpg", "jpeg"];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};

export const isValidImageFileSize = (file) => {
  const fileSize = file.size;
  return fileSize < 2000 * 1024; //(1000KB = 1MB) -> XX KB * 1024
};
