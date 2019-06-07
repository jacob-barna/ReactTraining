import React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./TextInput";

storiesOf("TextInput", module)
  .add("default", () => <TextInput label="Example label" />)
  .add("with preset value ", () => (
    <TextInput label="With value" value="Preset value" />
  ))
  .add("with error", () => (
    <TextInput label="With error" error="this text input has an error" />
  ));
