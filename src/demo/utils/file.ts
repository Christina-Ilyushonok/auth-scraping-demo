import fs from 'fs/promises';

export async function saveJSON(path: string, data: any) {
  await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Data saved to ${path}`);
}
