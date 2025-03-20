const { setupDatabase } = require('./index');

setupDatabase()
  .then((success) => {
    if (success) {
      console.log('✅ Database setup completed successfully');
      process.exit(0);
    } else {
      console.error('❌ Database setup failed');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }); 