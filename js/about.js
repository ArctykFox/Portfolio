function change_about(about) {
  let aboutTtitleDescription = document.querySelector(
    "#about-title-description"
  );
  let aboutDescription = document.querySelector("#about-description");
  let aboutImages = document.querySelector("#about-images");

  aboutTtitleDescription.innerHTML = about["about-title-description"];
  aboutDescription.innerHTML = about["about-description"];

  const aboutImagesLinks = about["about-images"];

  aboutImagesLinks.forEach((imageLink) => {
    aboutImages.innerHTML += `<img src="${imageLink}" alt="">`;
  });
}
