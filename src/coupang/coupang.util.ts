import * as crypto from 'crypto';
import * as moment from 'moment';

export const generateHmac = (
  method: string,
  url: string,
  secretKey: string,
  accessKey: string,
) => {
  console.log('3');
  const parts = url.split(/\?/);
  console.log('4');
  const [path, query = ''] = parts;
  console.log('5');
  const datetime = moment.utc().format('YYMMDD[T]HHmmss[Z]');
  console.log('6');
  const message = datetime + method + path + query;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');
  console.log('7');
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
};
