import * as FileSystem from 'expo-file-system';

export async function urisToBlobs(uris: string[]): Promise<Blob[]> {
    const blobPromises = uris.map(async (uri) => {
      const response = await fetch(uri);
      return response.blob();
    });
  
    return Promise.all(blobPromises); // Resolve all blobs in parallel
  }

export async function uriToBase64(uri: string): Promise<string> {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
}

export async function urisToBase64(uris: string[]): Promise<string[]> {
  return await Promise.all(uris.map(uriToBase64));
}
