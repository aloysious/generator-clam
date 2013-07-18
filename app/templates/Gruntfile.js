var path = require('path'),
	fs = require('fs'),
	os = require('os'),
	exec = require('child_process').exec;

module.exports = function (grunt) {


	var file = grunt.file;
	var task = grunt.task;
	var pathname = path.basename(__dirname);
	var files = doWalk('./');
	// files.js 存储项目中的所有js文件
	// file.css 存储项目中的所有css文件

    /**
     * 对每个具体任务进行配置
     */
    grunt.initConfig({

        pkg: grunt.file.readJSON('abc.json'),

		// 配置默认分支
		currentBranch: 'master',

        /**
         * 对页面进行清理
         */
        clean: {

            build: {
                src: 'build/*'
			}
        },

        /**
         * 进行KISSY 打包，仅做合并
         * 		@link https://github.com/daxingplay/grunt-kmc
		 *
		 * 如果需要只生成依赖关系表，请使用clam-tools:
		 * 		@link http://gitlab.alibaba-inc.com/jay.li/clam-tools
         */
        kmc: {
            options: {
                packages: [
                    {
                        name: '<%= pkg.name %>',
                        path: '../',
						charset:'utf-8'
                    }
                ],
				map: [['<%= pkg.name %>/', '<%= pkg.name %>/<%= currentBranch %>/']]
            },

            main: {
                files: [
                    {
						// 这里指定项目根目录下所有文件为入口文件，自定义入口请自行添加
                        expand: true,
                        src: [ '*.js', '!Gruntfile.js'],
                        dest: 'build/'
                    }
                ]
            },
			// 若有新任务，请自行添加
			/*
            simple-example: {
                files: [
                    {
                        src: "a.js",
                        dest: "build/index.js"
                    }
                ]
            }
			*/
        },

        /**
         * 将HTML编译为KISSY 模块
         * @link https://github.com/maxbbn/grunt-kissy-template
         */
        ktpl: {
            main: {
                files: [
                    {
                        expand: true,
                        dest: './',
                        src: 'mods/*-tpl.html',
                        ext: '.js'
                    }
                ]
            }
        },
        /**
         * CSS-Combo
		 * combo项目中所有css，通过@import "other.css"; 来处理依赖关系
         */
        css_combo: {
            options: {
                paths: './'
            },

            main: {
                files: [
                    {
                        expand: true,
                        src:files.css, 
                        dest: 'build/',
                        ext: '.css'
                    }
                ]
            }
        },
		/**
		 * YUIDoc
		 * 对build目录中的js文件生成文档，放入doc/中
		 */
		yuidoc: {
			compile: {
				name: 'generator-clam',
				description: 'A Clam generator for Yeoman',
				options: {
					paths: 'build/',
					outdir: 'doc/'
				}
			}
		},

        /**
         * 将LESS编译为CSS
         * @link https://github.com/gruntjs/grunt-contrib-less
         */
        less: {
            options: {
                paths: './'
            },

            main: {
                files: [
                    {
                        expand: true,
                        src: '*.less',
                        dest: 'build/',
                        ext: '.css'
                    }
                ]
            }
        },

        /**
         * 对JS文件进行压缩
         * @link https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
					 banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n',
                beautify: {
                    ascii_only: true
                }
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['*.js', '!*-min.js'],
                        dest: 'build/',
                        ext: '-min.js'
                    }
                ]
            }
        },

        /**
         * 对CSS 文件进行压缩
         * @link https://github.com/gruntjs/grunt-contrib-cssmin
         */
        cssmin: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['*.css', '!*-min.css'],
                        dest: 'build/',
                        ext: '-min.css'
                    }
                ]
            }
        },

        watch: {
            'js': {
                files: [ '*.js', 'mods/*.js', 'plugin/*.js' ],
                tasks: [ 'kmc', 'uglify' ]
            },
            'tpl': {
                files: 'mods/*-tpl.html',
                tasks: ['ktpl']
            },
            'less': {
                files: [ '*.less', 'mods/*.less' ],
                tasks: ['less', 'cssmin']
            }
        },

		/**
		 * 发布命令。
		 */
		exec: {
			tag: {
				command: 'git tag publish/<%= currentBranch %>'
			},
			publish: {
				command: 'git push origin publish/<%= currentBranch %>:publish/<%= currentBranch %>'
			},
			commit:{
			   command: 'git commit -m "<%= currentBranch %> - <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>"'
			},
			add: {
				command: 'git add .'	
			},
			prepub: {
				command: 'git push origin daily/<%= currentBranch %>:daily/<%= currentBranch %>'
			},
			grunt_publish: {
				command: 'grunt default:publish'
			},
			grunt_prepub:{
				command: 'grunt default:prepub'
			}
		},

		copy : {
			main: {
				files:[
					{
						src: files.js, 
						dest: 'build/', 
						filter: 'isFile'
					},
					{
						src: files.css, 
						dest: 'build/', 
						filter: 'isFile'
					},
					{
						src: files.less, 
						dest: 'build/', 
						filter: 'isFile'
					}
				]
			}
		}

    });

    /**
     * 载入使用到的通过NPM安装的模块
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css-combo');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-kissy-template');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');

	/**
	 * 正式发布
	 */
	grunt.registerTask('publish', 'clam publish...', function() {
		task.run('exec:grunt_publish');
	});

	/**
	 * 预发布
	 */
	grunt.registerTask('prepub', 'clam pre publish...', function() {
		task.run('exec:grunt_prepub');
	});

	/**
	 * 启动服务
	 */
	grunt.registerTask('on', 'clam server...', function() {
		initClamServer();
	});
	grunt.registerTask('server', 'clam server...', function() {
		initClamServer();
	});

	/*
	 * 获取当前库的信息
	 **/
	grunt.registerTask('info', 'clam info...', function() {
		var abcJSON = {};
		try {
			abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
			console.log('\n'+abcJSON.repository.url);
		} catch (e){
			console.log('未找到abc.json');
		}
	});

	// 启动clam server
	function initClamServer(){
		console.log('sdfsdf');
		exec('node -v');
	}

	// 遍历当前目录的文件
	function walk(uri, files) {

		var stat = fs.lstatSync(uri);
		if (stat.isFile() && !/(build|node_modules|demo|doc|\.git|\.+)[\\|\/]/i.test(uri) && !/grunt.+/i.test(uri)) {

			switch (path.extname(uri)) {
			case '.css':
				files.css.push(uri);
				break;
			case '.js':
				files.js.push(uri);
				break;
			case '.less':
				files.less.push(uri);
				break;
			case '.scss':
				files.scss.push(uri);
				break;
			default:
				files.other.push(uri);
			}
		}
		if (stat.isDirectory()) {
			fs.readdirSync(uri).forEach(function(part) {
				walk(path.join(uri, part), files);
			});
		}
	}


	// 得到文件结构的数据结构
	function doWalk(rootDir) {
		var files = {
			css: [],
			less: [],
			scss: [],
			js: [],
			other: [] // 暂时没用
		};
		walk(rootDir, files);
		return files;
	}


    // 打包
	return grunt.registerTask('default', 'clam running ...', function(type) {

		var done = this.async();

		// 获取当前分支
		exec('git branch', function(err, stdout, stderr, cb) {

			var reg = /\*\s+daily\/(\S+)/,
				match = stdout.match(reg);

			if (!match) {
				return grunt.log.error('当前分支为 master 或者名字不合法(daily/x.y.z)，请切换分支'.red);
			}

			grunt.log.write(('当前分支：' + match[1]).green);

			grunt.config.set('currentBranch', match[1]);

			done();

		});

		// 任务
		if (!type) {
			task.run(['clean:build', 'ktpl', 'copy', 'kmc', 'uglify', 'css_combo' ,'less', 'cssmin','yuidoc'/*, 'copy', 'clean:mobile'*/]);
		} else if ('publish' === type) {
			task.run(['exec:tag', 'exec:publish']);
		} else if ('prepub' === type) {
			task.run(['exec:add','exec:commit','exec:prepub']);
		}

	});
    
};


