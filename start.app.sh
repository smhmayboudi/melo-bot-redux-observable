export DEBUG=*,-not_this
export BOT_TOKEN=520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc
export HOSTNAME=localhost
export KEY=AIzaSyDw1FO0PiK1CUxpxMaTIrDGaEJRco4FBXg
export NODE_ENV=development
export REMOTEDEV_HOSTNAME=localhost
export REMOTEDEV_PORT=8000
export REMOTEDEV_REALTIME=true
export PORT=8081

node --require source-map-support/register --inspect=0.0.0.0:9229 ./dist/app.js