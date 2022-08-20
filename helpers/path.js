const path = require('path');
const { v4: uuidv4 } = require('uuid');

const tempDir = path.join(__dirname, '../tmp');

const avatarDir = path.join(__dirname, '../public/avatars');

const addToAvatarsPath = (filename) => {
  const extension = filename.split('.')[1];
  const newName = `${uuidv4()}.${extension}`;
  return {
    newPath: path.join(avatarDir, newName),
    avatarUrl: `/avatars/${newName}`,
  };
};

module.exports = {
  tempDir,
  avatarDir,
  addToAvatarsPath,
};
