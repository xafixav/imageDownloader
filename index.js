import {linksInHttp, allCurrencyNames} from "./fetchImage.js";
import axios from "axios";
import fs from 'fs';

const imageDownloader = async (url, image_path) => {
  axios({
    url,
    responseType: "stream",
  }).then((response) => {
    new Promise((resolve, reject) => {
      response.data.pipe(fs.createWriteStream(image_path))
      .on('finish', () => resolve())
      .on('error', (e) => reject(e))
    })
  })
}

const downloadAllImages = async () => {
  const allCurrencyImages = linksInHttp;
  const allRequests = allCurrencyImages.map((imageLink, index) => {
    const image_path = `./images/${allCurrencyNames[index]}.png`;
    imageDownloader(imageLink, image_path);
    setTimeout(() => {
      console.log(`Downloading ${allCurrencyNames[index]}.png`);
    }, 1000);
  })
  await Promise.all(allRequests);
  // set 1s of timeout to avoid rate limit
}

(async () => {
  await downloadAllImages();
})();