# export DEBUG=*,-not_this
export BOT_TOKEN=520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc
export HOST=127.0.0.1
export KEY=AIzaSyDm5ncKPp5XqgzebBDeNdp2UXUB4kC-O34
export NODE_ENV=development
export PORT=8081

rm -fr coverage
./node_modules/.bin/jest --detectOpenHandles --config ./jest.config.json --verbose