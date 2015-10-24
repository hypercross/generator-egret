var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	installingTypeScript: function(){
		this.npmInstall(['typescript', 'tsd'], { 'saveDev': true });
	},
	installingPromise: function(){
		this.npmInstall(['es6-promise'], {'save': true});
		this.spawnCommand('npm', ['run', 'tsd', 'install', 'es6-promise', '--save']);
	},
	installingWebpack: function(){
		this.npmInstall(
			['webpack', 'webpack-dev-server', 'ts-loader'],
			{saveDev: true}); 
	},
	writingConfigs: function(){
		this.fs.copy(
			this.templatePath('package.json'),
			this.destinationPath('package.json')
		);
		this.fs.copy(
			this.templatePath('webpack.config.js'),
			this.destinationPath('webpack.config.js')
		);
		this.fs.copy(
			this.templatePath('tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);
		this.fs.copy(
			this.templatePath('tsd.d.ts'),
			this.destinationPath('typings/tsd.d.ts')
		);
		this.fs.copy(
			this.templatePath('src/*.ts'),
			this.destinationPath('src')
		);
		this.fs.copy(
			this.templatePath('index.html'),
			this.destinationPath('public/index.html')
		);
	},
});
