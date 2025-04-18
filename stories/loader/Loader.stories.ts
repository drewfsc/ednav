import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Loader } from "./Loader";

const meta = {
  title: "Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    color: "blue",
    opacity: 1,
    size: "Loading...",
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

export const Loaded: Story = {
  args: {
    color: "blue",
    opacity: 1,
    size: "Loading...",
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};
