#export DEBUG=*,-not_this
export BOT_TOKEN=520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc
export GOOGLE_API_KEY=AIzaSyDw1FO0PiK1CUxpxMaTIrDGaEJRco4FBXg
export GOOGLE_API_LIST_MAX_RESULTS=10
export GOOGLE_API_SEARCH_LIST_TYPE=video
export HOSTNAME=127.0.0.1
export METRICS_COLLECTOR_PREFIX=melo_bot_redux_observable_
export METRICS_COLLECTOR_TIMEOUT=5000
export MONGO_CLIENT_APPNAME=melo_bot_redux_observable
export MONGO_CLIENT_LOGGER_LEVEL=info
export MONGO_CLIENT_URI=mongodb://127.0.0.1:27017
export NODE_ENV=development
export READINESS_START_TIMEOUT=2000
export READINESS_STOP_TIMEOUT=2000
export REMOTEDEV_HOSTNAME=127.0.0.1
export REMOTEDEV_NAME=melo_bot_redux_observable
export REMOTEDEV_PORT=8000
export REMOTEDEV_REALTIME=false
export PORT=8081
export SENTRY_DSN=https://a74e2edcd150475f82cef68e0b09c5cd@sentry.io/1784965
export SENTRY_RELEASE=development
export SENTRY_SERVERNAME=OSX

./node_modules/.bin/jest --config ./jest.config.json --coverage false --watch