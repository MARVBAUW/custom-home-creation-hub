
const { execSync } = require('child_process');

try {
  console.log('Updating browserslist database...');
  execSync('npx update-browserslist-db@latest');
  console.log('Successfully updated browserslist database!');
} catch (error) {
  console.error('Failed to update browserslist database:', error);
}
