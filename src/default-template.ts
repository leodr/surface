export const defaultTemplate = `
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
