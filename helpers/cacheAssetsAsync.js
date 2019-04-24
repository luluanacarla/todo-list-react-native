import { Image } from "react-native";
import { Asset, Font } from "expo";

const cacheImages = images =>
  images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

const cacheAssetsAsync = ({ images = [], fonts = [] }) =>
  Promise.all([...cacheImages(images), ...cacheFonts(fonts)])
    .then(() => {})
    .catch(() => {});

export default cacheAssetsAsync;
