const bcrypt = require('bcryptjs');

async function generateHashPassword() {
  const plainPassword = 'adminpassword123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log(hashedPassword);
}

generateHashPassword();
