import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { For } from "solid-js";
import { Button, buttonVariants } from "~/components/ui/button";
import { SITE_NAME } from "~/consts";
// import IconFa6XTwitter from "~icons/fa6-brands/x-twitter";
import IconMdiYoutube from "~icons/mdi/youtube";

type SocialLink = {
  href: string;
  icon: Component;
  label: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.youtube.com/@amazkaede",
    icon: IconMdiYoutube,
    label: "YouTube",
  },
];

const SocialButton: Component<SocialLink> = (props) => {
  const Icon = props.icon;
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.label}
      class={buttonVariants({ variant: "ghost" })}>
      <Icon />
      {props.label}
    </a>
  );
};

const SiteTitle: Component = () => (
  <Button
    size="lg"
    variant="ghost"
    as={A}
    href="/">
    <span class="text-lg font-bold font-serif">{SITE_NAME}</span>
  </Button>
);

const SocialLinks: Component = () => (
  <div class="flex flex-row items-center sm:justify-end">
    <For each={SOCIAL_LINKS}>{(link) => <SocialButton {...link} />}</For>
  </div>
);

export const Header: Component = () => {
  return (
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-base-100 text-sm py-2">
      <nav
        class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Main navigation">
        <SiteTitle />
        <SocialLinks />
      </nav>
    </header>
  );
};
