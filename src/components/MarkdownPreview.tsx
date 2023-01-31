import { useMemo, useState } from "react";
import { Converter } from "showdown";
import { defaultTemplate } from "../default-template";
import { fillTemplate, TemplateData } from "../template";

type Props = { data: TemplateData };

export function MarkdownPreview({ data }: Props) {
  const [converter] = useState(() => {
    const converter = new Converter();
    converter.setFlavor("github");
    return converter;
  });

  const { description, screenshotUrls, tagline, title, websiteUrl, logoUrl } =
    data;

  const markdown = useMemo(
    () =>
      fillTemplate(defaultTemplate, {
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
