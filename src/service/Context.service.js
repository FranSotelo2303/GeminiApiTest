import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getHistoryPath = (userId) => path.join(__dirname, `../data/historial_${userId}.json`);

export const loadHistory = (userId) => {
  const filePath = getHistoryPath(userId);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return [];
}

export const saveHistory = (userId, history) => {
  const filePath = getHistoryPath(userId);
  fs.writeFileSync(filePath, JSON.stringify(history, null, 2));
}
