const fs = require('fs');
const path = require('path');
const { createRedirectHtml } = require('./utils/createRedirectHtml');

const buildDir = path.resolve(__dirname, '..', 'build');

const legacyRedirectMap = {
  'about.php': '/about/',
  'biz.php': '/services/office-solution/',
  'contact.php': '/contact/',
  'design.php': '/services/it-solution/',
  'eco.php': '/services/eco-solution/',
  'electric.php': '/services/eco-solution/',
  'energy.php': '/services/eco-solution/',
  'index.php': '/',
  'list.php': '/news/',
  'marketing.php': '/services/it-solution/',
  'mobile.php': '/services/it-solution/',
  'office.php': '/services/office-solution/',
  'recruit.php': '/recruit/',
  'security.php': '/services/office-solution/',
  'thanks.php': '/contact/?thanks=1',
  'mailform/send.php': '/contact/',
};

let generatedCount = 0;

for (const [legacyPath, targetPath] of Object.entries(legacyRedirectMap)) {
  const destinationPath = path.join(buildDir, legacyPath);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.writeFileSync(destinationPath, createRedirectHtml(targetPath), 'utf8');
  generatedCount += 1;
}

console.log(`Generated ${generatedCount} legacy page redirects in build/.`);
