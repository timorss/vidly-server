const bcrypt = require('bcrypt')

const password = '1234'
async function run() {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log(salt);
  console.log(hash);
}

run()