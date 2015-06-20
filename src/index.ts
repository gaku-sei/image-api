/// <reference path="../node_modules/typescript/bin/lib.es6.d.ts"/>
/// <reference path="./typings/tsd.d.ts"/>

import * as express from 'express';
import * as bodyParser from 'body-parser';
import {resolve} from 'path';
import {find} from 'lodash';
import images from './fakes/images';

interface Response extends Express.Response {
  json(body: any): void;
  status(body: number): Response;
}

interface Request extends Express.Request {
  params: {[key: string]: string};
}

let app = express();

app.use(bodyParser.json());

app.get('/images/:id', (req: Request, res: Response) => {
  let image = find(images, {id: +req.params['id']});
  if(image) {
    res.json(image);
    // readFile(image['path'], (err: NodeJS.ErrnoException, data: Buffer) => {
    //   res.json(_.merge(image, {
    //     base64: `data:${lookup(image['path'])};base64,${data.toString('base64')}`
    //   }));
    // });
  } else {
    res.status(404).json({error: 'Image not found'});
  }
});

app.get('/images', (req: Request, res: Response) => {
  res.json(images);
});

app.use(express.static(resolve(__dirname, '..', '..', 'client')));
app.use('/static', express.static(resolve(__dirname, '..', 'images')));

export function run() {
  app.listen(5020, () => {
    console.log('API is up and running');
  });
};