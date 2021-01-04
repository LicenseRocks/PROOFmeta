import fs from "fs";
import path from "path";

const getDataByPath = (data, translationPath) => {
  let outcome = data;
  translationPath.split(".").forEach((pathName) => {
    outcome = outcome[pathName];
  });
  return outcome;
};

export const getServerTranslation = (
  locale = "en",
  filePath = "common",
  translationPath
) => {
  const normalizedFilename = filePath.match(/\/?([a-zA-Z0-9/]+)(\.json)?$/)[1];

  const jsonPath = path.resolve(
    path.join(
      path.resolve(process.cwd()),
      "public",
      "locales",
      locale,
      `${normalizedFilename}.json`
    )
  );

  const jsonContent = fs.readFileSync(jsonPath);
  return getDataByPath(JSON.parse(jsonContent), translationPath);
};

export const withServerTranslation = (locale = "en", translationFile) => (
  translationPath
) => getServerTranslation(locale, translationFile, translationPath);
