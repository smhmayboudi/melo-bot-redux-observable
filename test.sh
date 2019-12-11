#export DEBUG=*,-not_this
export BOT_NAME=melo_bit_bot
export BOT_TOKEN=520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc
export CHANNEL=melodio
export CHANNEL_JOIN_LINK=https://t.me/joinchat/AAAAAEPogeZYp43PUvrfyA
export DB_NAME=melodio
export GOOGLE_API_KEY=AIzaSyDw1FO0PiK1CUxpxMaTIrDGaEJRco4FBXg
export GOOGLE_API_LIST_MAX_RESULTS=10
export GOOGLE_API_SAFE_SEARCH=strict
export GOOGLE_API_SEARCH_LIST_TYPE=video
export GOOGLE_API_RELEVANCE_LANGUAGE=fa
export GOOGLE_API_REGION_CODE=ir
export HOSTNAME=127.0.0.1
export MARIA_CLIENT_URI=mariadb://root:testpassword@127.0.0.1:3306/mysql
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
export TELEGRAM_CAPTION_LENGTH=200
export TELEGRAM_TEXT_LENGTH=4096

rm -fr coverage
./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests
# [ OK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose actions
# [ NOK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose configs/store.test.ts
#         http
#         store
# [ NOK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose enhancers
#         monitor
# [ NOK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose epics
#         youtubeDownload
#         youtubeSearchListResult
#         youtubeVideoListResult
# [ NOK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose libs
#         mariadbObservable
#         mongodbObservable
#         request
#         requests
#         requestsUpload
#         requestUpload
#         youtubeDownload
# [ NOK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose middlewares
#         authorization
#         crashReporter
# [ OK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose reducers
# [ NOK ] ./node_modules/.bin/jest --config ./jest.config.json --detectOpenHandles --forceExit --passWithNoTests --verbose utils
#         string
