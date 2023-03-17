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

export function fillTemplate(data: TemplateData) {
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

export const template = `
<div align="center">
  <a href="{{ website-url }}" target="_blank">
    <img src="{{ logo-url }}" height="200" style="height: 200px" />
  </a>
</div>

<h1 align="center"><a href="{{ website-url }}" target="_blank">{{ title }}</a></h1>

<p align="center">
    <strong>{{ tagline }}</strong>
</p>

<br><br>

{{ description }}

<br>

## Screenshots

{{ screenshots }}

## Development

1. **Requirements**

   You need [Node.js](https://nodejs.org/en/) installed on your system.

2. **Install packages**

   Run \`npm install\` to install all neccesary packages.

3. **Run the application**

   Start the dev server by running \`npm run dev\`.
`;
