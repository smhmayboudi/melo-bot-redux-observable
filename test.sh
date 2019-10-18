#export DEBUG=*,-not_this
export BOT_TOKEN=520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc
export GOOGLE_API_KEY=AIzaSyDm5ncKPp5XqgzebBDeNdp2UXUB4kC-O34
export HOSTNAME=localhost
export METRICS_COLLECTOR_PREFIX=melo_bot_redux_observable_
export METRICS_COLLECTOR_TIMEOUT=5000
export NODE_ENV=development
export READINESS_START_TIMEOUT=2000
export READINESS_STOP_TIMEOUT=2000
export REMOTEDEV_HOSTNAME=localhost
export REMOTEDEV_NAME=melo-bot-redux-observable
export REMOTEDEV_PORT=8000
export REMOTEDEV_REALTIME=true
export PORT=8081
export SENTRY_DSN=
export SENTRY_SERVERNAME=

rm -fr coverage
./node_modules/.bin/jest --detectOpenHandles --config ./jest.config.json --verbose