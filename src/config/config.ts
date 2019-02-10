import * as dotenv from 'dotenv';


dotenv.config();

let path: string;
let environment = process.env.NODE_ENV || 'development';

switch (environment) {
  case "development":
    path = `${__dirname}/.env.development`;
    break;
  case "production":
    path = `${__dirname}/.env.production`;
    break;
  default:
    path = `${__dirname}/.env.development`;
}

const configure = dotenv.config({ path: path });
export default configure;
