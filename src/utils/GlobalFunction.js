export const isValidImageFileType = (file) => {
  const validExtensions = ["png", "jpg", "jpeg"];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};

export const isValidImageFileSize = (file) => {
  const fileSize = file.size;
  return fileSize < 3000 * 1024; //(1000KB = 1MB) -> XX KB * 1024
};

export const goToMessenger = () => {
  //const userAgent = navigator.userAgent.toLowerCase();

  const messengerURL = "https://m.me/wellnesslifetravel";
  // const messengerURL = " fb-messenger://user-thread/2133611536658022";

  window.location.href = messengerURL;
};

export const sendEmail = () => {
  window.open("mailto:wellnesslifetravel@gmail.com?subject=Inquiry", "_blank");
};

export const makePhoneCall = () => {
  window.location.href = "tel:0932392359";
};

export const addLineID = () => {
  // window.open("line://ti/p/wellnesslife19", "_blank");

  const userAgent = navigator.userAgent.toLowerCase();

  // Check if the user agent is on a mobile device
  if (/iphone|ipad|ipod|android/.test(userAgent)) {
    const lineURL = "https://line.me/ti/p/56jgUOIvkZ";

    // Open the Line application
    window.location.href = lineURL;
  } else {
    // Open the Line ID in a new tab or window
    window.open("line://ti/p/wellnesslife19", "_blank");
  }
};
