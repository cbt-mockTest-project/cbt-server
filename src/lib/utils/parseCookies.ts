export const parseCookies = (
  cookieString: string,
): {
  [key: string]: string;
} => {
  const cookies = {};
  if (cookieString) {
    const separateCookies = cookieString.split(';');
    separateCookies.forEach(function (cookie) {
      const parts = cookie.match(/(.*?)=(.*)$/);
      if (parts) {
        const name = parts[1].trim();
        const value = decodeURIComponent(parts[2].trim());
        cookies[name] = value;
      }
    });
  }
  return cookies;
};
