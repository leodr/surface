import titleCase from "title";
import spaceCase from "to-space-case";
import { GithubRepositoryRepsonse } from "./repo-response-types";
import { TemplateData } from "./template";

export type ImportGithubRepositoryParameters = {
  owner: string;
  repository: string;
};

export async function importGithubRepository({
  owner,
  repository,
}: ImportGithubRepositoryParameters): Promise<Partial<TemplateData>> {
  const repositoryResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repository}`
  );

  if (!repositoryResponse.ok) {
    throw Error("Error while fetching repository data.");
  }

  const repositoryData =
    (await repositoryResponse.json()) as Partial<GithubRepositoryRepsonse>;

  let title;

  if (repositoryData.name) {
    title = titleCase(spaceCase(repositoryData.name));
  }

  const defaultBranch = repositoryData.default_branch ?? "main";

  const readmeResponse = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repository}/${defaultBranch}/README.md`
  );

  const description = "";

  if (readmeResponse.ok) {
    const readme = await readmeResponse.text();

    const readmeSections = splitMdIntoSections(readme)
      .map((e) => e.trim())
      .filter(Boolean)
      .map((e) => replaceSingleNewlines(e));

    let description = "";

    for (const string of readmeSections) {
      if (string.length > description.length) description = string;
    }
  }

  return {
    title,
    tagline: repositoryData.description,
    websiteUrl: repositoryData.homepage,
    description,
  };
}

function splitMdIntoSections(markdown: string) {
  return markdown.split(/(^\s*[<#].*|\n\s*[<#].*)/g);
}

function replaceSingleNewlines(text: string) {
  return text.replace(/(?<!\n)\n(?!\n)/g, " ");
}
