const {APP_PORT}=require('./src/config/config.default.js')

const app=require('./src/app')

app.listen(APP_PORT, () => {
  console.log(`http://127.0.0.1:${APP_PORT}`);
});
