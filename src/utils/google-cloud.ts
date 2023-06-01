import { v4 } from 'uuid';
import { Storage } from '@google-cloud/storage';
import { extname, join, resolve } from 'path';

const projectId = 'peerless-watch-382417';
const keyFilename = resolve(process.cwd(), 'src', 'utils', 'key.json');
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket('producti0n');

export const googleCloud = (file: any | any[]) => {
  const a: any[] = [];
  a.push(file);
  const imageLink = join(v4() + extname(a[0]?.originalname));
  const blob = bucket.file(imageLink);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    console.log(err);
  });

  blobStream.end(a[0]?.buffer);
  return imageLink;
};

// import { v4 as uuidv4 } from 'uuid';
// import { Storage } from '@google-cloud/storage';
// import { extname, join, resolve } from 'path';

// const projectId = 'peerless-watch-382417';
// const keyFilename = resolve(process.cwd(), 'src', 'utils', 'key.json');
// const bucketName = 'producti0n';

// const storage = new Storage({
//   projectId,
//   keyFilename,
// });

// const bucket = storage.bucket(bucketName);

// export const googleCloud = (file: Express.Multer.File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const fileName = uuidv4() + extname(file.originalname);
//     const blob = bucket.file(fileName);
//     const blobStream = blob.createWriteStream();

//     blobStream.on('error', (error) => {
//       reject(error);
//     });

//     blobStream.on('finish', () => {
//       resolve(fileName);
//     });

//     blobStream.end(file.buffer);
//   });
// };
