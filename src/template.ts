export type TemplateData = {
  title: string;
  websiteUrl: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  screenshotUrls: Array<string>;
};

const titleRegexp = /{{\s*title\s*}}/g;
const websiteUrlRegexp = /{{\s*website-url\s*}}/g;
const taglineRegexp = /{{\s*tagline\s*}}/g;
const descriptionRegexp = /{{\s*description\s*}}/g;
const screenshotsRegexp = /{{\s*screenshots\s*}}/g;
const logoUrlRegexp = /{{\s*logo-url\s*}}/g;

export function fillTemplate(template: string, data: TemplateData) {
  return template
    .replace(titleRegexp, escapeHTML(data.title))
    .replace(websiteUrlRegexp, escapeHTML(data.websiteUrl))
    .replace(taglineRegexp, escapeHTML(data.tagline))
    .replace(descriptionRegexp, escapeHTML(data.description))
    .replace(
      screenshotsRegexp,
      data.screenshotUrls.map((url) => `![](${url})`).join("\n\n")
    )
    .replace(logoUrlRegexp, escapeHTML(data.logoUrl ?? ""));
}

function escapeHTML(text: string): string {
  const element = document.createElement("p");
  element.textContent = text;
  return element.innerHTML;
}
