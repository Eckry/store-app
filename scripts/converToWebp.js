import fs from "fs";
import sharp from "sharp";

fs.readdir("../public/images", (e, files) => {
  if (e) throw e;
  files.forEach((file) => {
    console.info(`Converting ${file}...`);
    
    sharp(`../public/images/${file}`)
      .webp({
        lossless: false,
        quality: 45
      })
      .toFile(`../public/imagesWebp/${file.split(".")[0]}.webp`);
  });
});
