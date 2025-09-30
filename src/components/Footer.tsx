import type { Component } from "solid-js";
import { COPYRIGHT } from "~/consts";

export const Footer: Component = () => {
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} ${COPYRIGHT}`;

  return (
    <footer class="bg-base-100">
      <div class="container mx-auto">
        <div class="py-4 text-center text-secondary-foreground">
          <small>{copyrightText}</small>
        </div>
      </div>
    </footer>
  );
};
