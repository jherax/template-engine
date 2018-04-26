import fs from 'fs';
import {join} from 'path';

const getFile = (fileName) => {
  const templateFile = join(__dirname, fileName);
  return new Promise((resolve, reject) => {
    fs.readFile(templateFile, {encoding: 'utf-8'}, (error, data) => {
      if (error != null) reject(error);
      resolve(data);
    });
  });
};

export default getFile;
