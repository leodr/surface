import { Dialog } from "@headlessui/react";
import { ImageIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { TextInput } from "./components/TextInput";
import { Theme, ThemeToggle } from "./components/ThemeToggle";
import { defaultTemplate } from "./default-template";
import { importGithubRepository } from "./repo-import";
import { fillTemplate } from "./template";

function App() {
  const [title, setTitle] = useState(appNameExample);
  const [tagline, setTagline] = useState(taglineExample);
  const [websiteUrl, setWebsiteUrl] = useState("https://");
  const [description, setDescription] = useState(defaultDescription);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<FileList | null>(null);

  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const [githubImportUrl, setGithubImportUrl] = useState(
    "https://github.com/leodr/surface"
  );

  const [theme, setTheme] = useState<Theme>(getThemeFromMediaQuery);

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const logo = event.target.files?.[0];

    setLogoFile(logo ?? null);
  }
  function handleScreenshotsChange(event: ChangeEvent<HTMLInputElement>) {
    const screenshots = event.target.files;

    setScreenshotFiles(screenshots);
  }

  function handleImport() {
    setImportDialogOpen(false);

    const info = getRepoAndOwnerFromGithubUrl(githubImportUrl);

    if (info) {
      importGithubRepository(info).then(
        ({ description, tagline, title, websiteUrl }) => {
          if (title) setTitle(title);
          if (description) setDescription(description);
          if (tagline) setTagline(tagline);
          if (websiteUrl) setWebsiteUrl(websiteUrl);
        }
      );
    }
  }

  function handleCopyMarkdown() {
    const markdown = fillTemplate(defaultTemplate, {
      title,
      description,
      screenshotUrls: screenshotUrls.map(
        (_, i) => `./readme-assets/screenshot-${i + 1}.png`
      ),
      tagline,
      websiteUrl,
      logoUrl: "./readme-assets/logo.png",
    });

    navigator.clipboard.writeText(markdown);
  }

  const [logoUrl, setLogoUrl] = useState<string>();

  useEffect(() => {
    if (logoFile) {
      const logoUrl = URL.createObjectURL(logoFile);

      setLogoUrl(logoUrl);

      return () => {
        URL.revokeObjectURL(logoUrl);
      };
    } else {
      setLogoUrl(undefined);
    }
  }, [logoFile]);

  const [screenshotUrls, setScreenshotUrls] = useState<string[]>([]);

  useEffect(() => {
    if (screenshotFiles) {
      const screenshotUrls = Array.from(screenshotFiles, (file) =>
        URL.createObjectURL(file)
      );

      setScreenshotUrls(screenshotUrls);

      return () => {
        for (const screenshotUrl of screenshotUrls) {
          URL.revokeObjectURL(screenshotUrl);
        }
      };
    } else {
      setScreenshotUrls([]);
    }
  }, [screenshotFiles]);

  return (
    <>
      <div className="border-b border-white flex items-center justify-center gap-4">
        <button
          className="bg-white text-black flex items-center gap-2 px-4 py-3 rounded-sm"
          onClick={() => setImportDialogOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>Import from GitHub</span>
        </button>
        <button className="bg-gray-900 flex items-center gap-2 px-4 py-3 rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span>Clear</span>
        </button>
      </div>
      <div className="border-b border-white flex items-center justify-center">
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
      </div>
      <div className="flex-1 bg-black text-white overflow-y-auto p-8">
        <h1 className="mb-8 text-4xl">Surface</h1>
        <form className="flex flex-col gap-8">
          <label className="flex flex-col gap-2 self-start" htmlFor="logo">
            <span className="uppercase text-gray-300 text-sm tracking-wide">
              Logo
            </span>
            <input
              onChange={handleLogoChange}
              className="sr-only"
              type="file"
              accept="image/*"
              id="logo"
            />
            <div className="bg-gray-900 flex items-center gap-2 px-4 py-3 rounded-sm w-fit">
              <ImageIcon />
              <span>Choose...</span>
            </div>
          </label>
          <TextInput
            label="Title"
            value={title}
            onChange={setTitle}
            id="title"
            placeholder={appNameExample}
          />
          <TextInput
            label="Tagline"
            value={tagline}
            onChange={setTagline}
            id="tagline"
            placeholder={taglineExample}
          />
          <TextInput
            label="Website"
            value={websiteUrl}
            onChange={setWebsiteUrl}
            id="website"
            placeholder={`https://${appNameExample.toLowerCase()}.com/`}
          />
          <TextInput
            area
            label="Description"
            value={description}
            onChange={setDescription}
            id="description"
            hint="Use double new line to start a new paragraph. Markdown syntax supported."
          />
          <label className="flex flex-col gap-2" htmlFor="screenshots">
            <span className="uppercase text-gray-300 text-sm tracking-wide">
              Screenshots
            </span>
            <input
              className="sr-only"
              onChange={handleScreenshotsChange}
              type="file"
              accept="image/*"
              id="screenshots"
              multiple
            />
            <div className="bg-gray-900 flex items-center gap-2 px-4 py-3 rounded-sm w-fit">
              <ImageIcon />
              <span>Choose...</span>
            </div>
          </label>
        </form>
      </div>
      <div
        className={`flex-1 relative min-h-0 ${
          theme === "dark" ? "bg-[#0d1117]" : "bg-white"
        }`}
      >
        <div className="p-4 overflow-y-auto max-h-full flex justify-center">
          <MarkdownPreview
            data={{
              title,
              description,
              screenshotUrls,
              tagline,
              websiteUrl,
              logoUrl,
            }}
            theme={theme}
          />
        </div>
        <button
          className="bg-gray-900 flex items-center gap-3 px-6 py-4 rounded-full absolute bottom-10 right-10 border-2 border-white"
          onClick={handleCopyMarkdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-clipboard"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <span>Copy Markdown</span>
        </button>
      </div>
      <Dialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-80">
          <Dialog.Panel className="w-full max-w-sm rounded bg-black p-8 text-white flex flex-col gap-8">
            <Dialog.Title className="text-white text-2xl">
              Import GitHub Repository
            </Dialog.Title>
            <TextInput
              label="GitHub Repository URL"
              value={githubImportUrl}
              onChange={setGithubImportUrl}
              id="github-import-url"
              placeholder="https://github.com/leodr/surface"
            />
            <button onClick={handleImport}>Import</button>
            <button onClick={() => setImportDialogOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

function getThemeFromMediaQuery(): Theme {
  const shouldUseDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return shouldUseDarkMode ? "dark" : "light";
}

function getRepoAndOwnerFromGithubUrl(url: string) {
  const regex = /(?:https:\/\/)(?:www\.)?github\.com\/(.+?)\/(.+)?/;

  const match = url.match(regex);

  if (match && match[1] && match[2]) {
    return {
      owner: match[1],
      repository: match[2],
    };
  }

  return null;
}

const appNameExamples = [
  "Serendipity",
  "Ethereal",
  "Nebula",
  "Quixotic",
  "Harmony",
  "Euphoria",
  "Serene",
  "Eclipse",
  "Zenith",
  "Nirvana",
];

const appNameExample =
  appNameExamples[Math.floor(Math.random() * appNameExamples.length)];

const taglineExamples = [
  "Discover the unexpected in your daily life.",
  "Experience the intangible beauty of art and design.",
  "Explore the unknown and expand your horizons.",
  "Find the extraordinary in the ordinary.",
  "Create balance and harmony in your schedule.",
  "Feel the joy of accomplishing your goals.",
  "Find peace and tranquility in a hectic world.",
  "See the unseen and capture your imagination.",
  "Achieve greatness and reach your full potential.",
  "Reach enlightenment and improve your well-being.",
];

const defaultDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius metus nibh, in auctor turpis posuere iaculis.

Vestibulum magna metus, fermentum id magna vitae, bibendum sollicitudin augue. Vivamus ligula mi, porttitor sit amet elementum ut, tristique vitae turpis. 

Duis bibendum scelerisque dolor vel scelerisque. Praesent auctor vulputate eleifend. Cras accumsan, felis in iaculis maximus, dui arcu porta libero, eu efficitur dolor justo in lectus.`;

const taglineExample =
  taglineExamples[Math.floor(Math.random() * taglineExamples.length)];

export default App;
