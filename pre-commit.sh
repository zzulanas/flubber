#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling, testing and building your project before committing'

# Check Prettier standards
npm run check-format ||
(
    echo 'Prettier Check Failed. Run npm run format, add changes and try commit again.';
    false;
)

# Check ESLint Standards
npm run check-lint ||
(
        echo 'ESLint Check Failed. Make the required changes listed above, add changes and try to commit again.'
        false; 
)

# Check tsconfig standards
npm run check-types ||
(
    echo 'Are you seriously trying to write that? Make the changes required above.'
    false;
)

# If everything passes... Now we can commit
echo 'Alright... Code looks good to me... Trying to build now'

npm run build ||
(
    echo 'Next build failed: View the errors above to see why.'
    false;
)

# If everything passes... Now we can commit
echo '✅✅✅✅ All checks passes, commit successful ✅✅✅✅'
