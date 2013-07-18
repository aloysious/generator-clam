var path = require('path'),
	fs = require('fs'),
	os = require('os');

module.exports = function (grunt) {


	var file = grunt.file;
	var task = grunt.task;
	var pathname = path.basename(__dirname);
	var files = doWalk('./');

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
         * 进行KISSY 打包
         * @link https://github.com/daxingplay/grunt-kmc
         */
        kmc: {
            options: {
                packages: [
                    {
                        name: '<%%= pkg.name %>',
                        path: '../',
						charset:'utf-8'
                    }
                ],
				map: [['<%%= pkg.name %>/', '<%%= pkg.name %>/<%%= currentBranch %>/']]
            },

            main: {
                files: [
                    {
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
            },
			"another-example":{
                files: [
                    {
                        src: "index.js",
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
         */
        css_combo: {
            options: {
                paths: './'
            },

            main: {
                files: [
                    {
                        expand: true,
                        src: '*.css',
                        dest: 'build/',
                        ext: '.css'
                    }
                ]
            }
        },
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				options: {
					paths: 'path/to/source/code/',
					outdir: 'where/to/save/docs/'
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
         * 编译Compass & SASS
         * @link https://github.com/gruntjs/grunt-contrib-compass
         */
        compass: {
            options: {
                outputStyle: 'nested',
                noLineComments: true,
                importPath:  './',
                trace: true
            },

            main: {
                options: {
                    sassDir: './',
                    cssDir: 'build/'
                }
            }
        },

        /**
         * 对JS文件进行压缩
         * @link https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n',
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
            },
            'compass': {
                files: [ '*.scss', 'mods/*.scss'],
                tasks: ['compass', 'cssmin']
            }
        },

		/**
		 * 发布命令。
		 */
		exec: {
			tag: {
				command: 'git tag publish/<%%= currentBranch %>'
			},
			publish: {
				command: 'git push origin publish/<%%= currentBranch %>:publish/<%%= currentBranch %>'
			},
			grunt: {
				command: 'grunt default:publish'
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
					},
					{
						src: files.scss, 
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
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-kissy-template');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');

	/**
	 * 发布
	 */
	grunt.registerTask('publish', 'clam publish...', function() {

		task.run('exec:grunt');
		
	});

	// 遍历当前目录的文件
	function walk(uri, files) {

		var stat = fs.lstatSync(uri);
		if (stat.isFile() && !/(build|node_modules|demo|\.git|\.+)[\\|\/]/i.test(uri) && !/grunt.+/i.test(uri)) {

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

		var exec = require('child_process').exec;

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
			task.run(['clean:build', 'ktpl', 'copy', 'kmc', 'uglify', 'css_combo' ,'less', 'compass', 'cssmin','yuidoc'/*, 'copy', 'clean:mobile'*/]);
		} else if ('publish' === type) {
			task.run(['exec:tag', 'exec:publish']);
		}

	});
    
};


