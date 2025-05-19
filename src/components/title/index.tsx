"use client";
import { Code } from "@mui/icons-material";
import { ThemedTitleV2 } from "@refinedev/mui";
import { HamburgerMenu, RefineLayoutThemedTitleProps } from "@refinedev/mui";

import React from "react";

export const Title: React.FC<RefineLayoutThemedTitleProps> = (props) => {
  return <ThemedTitleV2 {...props} text="P2CODE" icon={<Code />} />;
};
