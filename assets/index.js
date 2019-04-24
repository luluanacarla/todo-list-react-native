import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const dubaiLight = require("./fonts/dubai-light.ttf");
const dubaiRegular = require("./fonts/dubai-regular.ttf");
const dubaiMedium = require("./fonts/dubai-medium.ttf");
const dubaiBold = require("./fonts/dubai-bold.ttf");

export default {
  images: [],
  fonts: [
    MaterialIcons.font,
    MaterialCommunityIcons.font,
    { "dubai-light": dubaiLight },
    { "dubai-regular": dubaiRegular },
    { "dubai-medium": dubaiMedium },
    { "dubai-bold": dubaiBold }
  ]
};
