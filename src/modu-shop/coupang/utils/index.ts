import * as moment from 'moment';
import * as crypto from 'crypto';

export const generateHmac = (
  method: string,
  url: string,
  accessKey: string,
  secretKey: string,
): string => {
  const parts = url.split(/\?/);
  const [path, query = ''] = parts;

  const datetime = moment.utc().format('YYMMDD[T]HHmmss[Z]');
  const message = datetime + method + path + query;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');

  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
};
