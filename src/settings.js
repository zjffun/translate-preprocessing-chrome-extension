import defaultTo from "lodash/defaultTo";

export const defaultSettings = {
  enablePreprocessing: true,
  enablePreprocessingCode: true,
  debugMode: false,
};

export default function getSettings(storedSettings) {
  return {
    enablePreprocessing: defaultTo(
      storedSettings.enablePreprocessing,
      defaultSettings.enablePreprocessing
    ),
    enablePreprocessingCode: defaultTo(
      storedSettings.enablePreprocessingCode,
      defaultSettings.enablePreprocessingCode
    ),
    debugMode: defaultTo(storedSettings.debugMode, defaultSettings.debugMode),
  };
}
