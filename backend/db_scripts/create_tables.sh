#!/bin/sh
echo 'Creating database and seeding tables...'
cat *.sql | mysql --defaults-file=config.cnf
echo '
Done.'
$SHELL