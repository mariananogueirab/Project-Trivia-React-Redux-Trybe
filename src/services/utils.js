import md5 from 'crypto-js/md5';

function setGravatarImage(email) {
  const gravatar = email ? md5(email.toLowerCase().trim()).toString() : '';
  const srcImage = `https://www.gravatar.com/avatar/${gravatar}`;
  return srcImage;
}

export default setGravatarImage;
