const Generator = require('yeoman-generator');

// const fs = require('fs');
// 获取路径
// const getAllFiles = (filePath) => {
//   let allFilePaths = [];
//   if (fs.existsSync(filePath)) {
//     const files = fs.readdirSync(filePath);
//     for (let i = 0; i < files.length; i++) {
//       let file = files[i]; // 文件名称（不包含文件路径）
//       let currentFilePath = filePath + '/' + file;
//       let stats = fs.lstatSync(currentFilePath);
//       if (stats.isDirectory()) {
//         allFilePaths = allFilePaths.concat(getAllFiles(currentFilePath));
//       } else {
//         allFilePaths.push(currentFilePath.split('/templates/')[1]);
//       }
//     }
//   } else {
//     console.warn(`指定的目录${filePath}不存在！`);
//   }

//   return allFilePaths;
// };

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your Project name',
        default: this.appname
      }
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    const templates = [
      '.env',
      'main.js',
      'package-lock.json',
      'package.json',
      'src/app/errHandler.js',
      'src/app/index.js',
      'src/app/tokenError.js',
      'src/config/config.default.js',
      'src/constant/err.type.js',
      'src/controller/good.controller.js',
      'src/controller/update.controller.js',
      'src/controller/user.controller.js',
      'src/db/seq.js',
      'src/middleware/goods.middleware.js',
      'src/middleware/update.middleware.js',
      'src/middleware/user.middleware.js',
      'src/model/goods.model.js',
      'src/model/user.model.js',
      'src/router/goods.router.js',
      'src/router/index.js',
      'src/router/update.router.js',
      'src/router/user.router.js',
      'src/service/good.service.js',
      'src/service/user.service.js',
      'src/upload/upload_24afa32bae4e02ccec0a59bc966871ee.png',
      'src/upload/upload_38e12a63c8616f12bfe8c158d856657d.png',
      'src/upload/upload_3b6e554405ca2c7c2f7358810eed4859.png',
      'src/upload/upload_3e71c2f16b378c951f8938cc73395c21.png',
      'src/upload/upload_53f74c75a5f261b7c49af3ed5201ac68.png',
      'src/upload/upload_574af4513c1260f803eefde81996ae30.png',
      'src/upload/upload_5e5d22522421dc1ee97b33f7bcc08417.png',
      'src/upload/upload_696e1cd5ed256d3849f2a900671b3378.png',
      'src/upload/upload_6e157aa61725c3ecd16d440d6a6ce27e.png',
      'src/upload/upload_702d6de6cc9ea8e413c4db2c89a61d8a.png',
      'src/upload/upload_771de6dbdc017426535d932ace048eaf.png',
      'src/upload/upload_a4a4e14f68a3e2a49bbadec9fcf78dd0.png',
      'src/upload/upload_b7e7467e2a46e3eaa3d5eaa5c1dd490b.png',
      'src/upload/upload_d6b759dbe51aeb060991885ec2d65ecf.png',
      'src/upload/upload_e22b4702cd825899113a6e3ffbeb51b8.png'
    ];
    templates.forEach((item) => {
      this.fs.copyTpl(this.templatePath(item), this.destinationPath(item),this.answers);
    });
  }
};
