const bcrypt = require('bcryptjs');

const plainPassword = process.argv[2];

if (!plainPassword) {
  console.log('Please provide a password to hash.');
  console.log('Usage: node hash-password.js <your_password>');
  process.exit(1);
}

const saltRounds = 10;
bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed Password:', hash);
});
