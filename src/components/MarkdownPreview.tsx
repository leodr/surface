import darkCss from "github-markdown-css/github-markdown-dark.css?raw";
import lightCss from "github-markdown-css/github-markdown-light.css?raw";
import { useMemo, useState } from "react";
import { Converter } from "showdown";
import { fillTemplate, TemplateData } from "../template";
import { Theme } from "./ThemeToggle";

type Props = { data: TemplateData; theme: Theme };

export function MarkdownPreview({ data, theme }: Props) {
  const [converter] = useState(() => {
    const converter = new Converter();
    converter.setFlavor("github");
    return converter;
  });

  const { description, screenshotUrls, tagline, title, websiteUrl, logoUrl } =
    data;

  const markdown = useMemo(
    () =>
      fillTemplate({
        title,
        tagline,
        websiteUrl,
        description,
        logoUrl,
        screenshotUrls,
      }),
    [description, logoUrl, screenshotUrls, tagline, title, websiteUrl]
  );

  const html = useMemo(
    () => converter.makeHtml(markdown),
    [converter, markdown]
  );

  return (
    <article className="markdown-body mx-auto max-w-[80ch]">
      <style
        dangerouslySetInnerHTML={{
          __html: theme === "dark" ? darkCss : lightCss,
        }}
      ></style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
