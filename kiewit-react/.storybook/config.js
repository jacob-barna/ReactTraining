import { configure } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";

function loadStories() {
  require("../src/stories");
  require("../src/shared/TextInput/TextInput.storybook");
}

configure(loadStories, module);
