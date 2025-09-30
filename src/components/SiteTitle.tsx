import { Title } from "@solidjs/meta";
import type { Component } from "solid-js";
import { SITE_NAME } from "~/consts";

type SiteTitleProps = {
  title?: string;
};

export const SiteTitle: Component<SiteTitleProps> = (props) => (
  <Title>{props.title ? `${props.title} - ${SITE_NAME}` : SITE_NAME}</Title>
);
