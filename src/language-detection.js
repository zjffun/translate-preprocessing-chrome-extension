import { ModelOperations } from "@vscode/vscode-languagedetection";

export const modulOperations = new ModelOperations({
  modelJsonLoaderFunc: async () => {
    const response = await fetch(
      chrome.runtime.getURL("@vscode/vscode-languagedetection/model/model.json")
    );

    try {
      const modelJSON = await response.json();
      return modelJSON;
    } catch (e) {
      const message = `Failed to parse model JSON.`;
      throw new Error(message);
    }
  },
  weightsLoaderFunc: async () => {
    const response = await fetch(
      chrome.runtime.getURL(
        "@vscode/vscode-languagedetection/model/group1-shard1of1.bin"
      )
    );
    const buffer = await response.arrayBuffer();
    return buffer;
  },
});
