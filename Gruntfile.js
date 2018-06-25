module.exports = function (grunt) {
  //初始化grunt 配置
  grunt.initConfig({
    //获取package.json的信息
    pkg: grunt.file.readJSON('package.json'),
    config: {
      name: 'app',
      //源文件目录
      src: './src',
      //生产文件目录
      dist: '<%= pkg.name %>'
    },
    //清除目录
    clean: {
      all: ['<%= config.dist %>/**', '<%= config.dist %>/*.*']
    },
    // 复制
    copy: {
      src: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/',
          src: ['*.html'],
          dest: '<%= config.dist %>/'
        }]
      },
      temp: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/temp',
          src: ['*.*'],
          dest: '<%= config.dist %>/temp'
        }]
      }
    },
    // Sass编译
    // 获取sass下文件，编译后存入css文件夹下，供兼容和压缩使用
    sass: {
      build: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/scss',
          src: ['**/*.scss'],
          dest: '<%= config.src %>/css',
          ext: '.css'
        }]
      }
    },
    // Autoprefixer解析CSS文件并且添加浏览器前缀到CSS规则里,保证CSS兼容性
    // 从css文件夹下获取
    autoprefixer: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/css',
          src: ['*.css', '!*.min.css'],
          dest: '<%= config.src %>/css',
          ext: '.css'
        }]
      }
    },
    // 文件合并,
    // 存放在<%= config.dist %>文件，以.min.*后缀，使得压缩后覆盖点合并文件
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      // 将所有js文件合并为app.js
      js: {
        src: [
          "<%= config.src %>/js/*.js",
        ],
        dest: "<%= config.dist %>/js/app.min.js"
      },
      // 将所有css文件合并为style.css
      css: {
        src: [
          "<%= config.src %>/css/*.css"
        ],
        dest: "<%= config.dist %>/css/style.min.css"
      }
    },
    //压缩js，
    // 从<%= config.dist %>目录下获取(合并的app.js)，存到<%= config.dist %>目录
    uglify: {
      options: {
        //合并时允许输出头部信息
        stripBanners: true,
        // 此处定义的banner注释将插入到输出文件的顶部
        banner: '/*! <%= pkg.author.name %>-app.min.js-<%=pkg.verson%> 最后修改于：<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        options: {
          // 不混淆变量名
          mangle: false,
          // 不删除注释，还可以为 false（删除全部注释）
          preserveComments: 'false',
          // 输出压缩率，可选的值有 false(不输出信息)，gzip
          report: "min"
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/js',
          src: ['*.js'],
          dest: '<%= config.dist %>/js',
          ext: '.min.js'
        }]
      }
    },
    //css压缩
    // 从<%= config.dist %>css文件夹下获取，存入<%= config.dist %>
    cssmin: {
      options: {
        stripBanners: true, //合并时允许输出头部信息
        banner: '/*! <%= pkg.author.name %>-style.min.css-<%=pkg.verson%> 最后修改于：<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/css',
          src: ['*.css'],
          dest: '<%= config.dist %>/css',
          ext: '.min.css'
        }]
      }
    },
    //对css和js文件重命名，添加版本号
    // html和图片文件除外
    filerev: {
      build: {
        files: [{
          src: ['<%= config.dist %>/**',
            '!<%= config.dist %>/*.html', 
            '!<%= config.dist %>/**/*.{png,jpg,jpeg}'
          ] 
        }]
      }
    },
    // 图片压缩
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7 //图片优化水平:1~7
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    // 处理css\js引入合并
    useminPrepare: {
      build: {
        files: [{
          src: '<%= config.dist %>/*.html'
        }],
      }
    },
    usemin: {
      html: {
        files: [{
          src: '<%= config.dist %>/*.html'
        }]
      }
    },
    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: ['*.html'],
          dest: '<%= config.dist %>/'
        }]
      }
    },
    //watch自动化
    watch: {
      build: {
        files: ['<%= config.src %>/**', '<%= config.src %>/js/', '<%= config.src %>/css', '<%= config.src %>/scss'],
        tasks: ['newer:cssmin', 'newer:uglify'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    // 服务
    connect: {
      server: {
        options: {
          protocol: 'http',
          port: 8000,
          hostname: '*',
          keepalive: true,
          base: ['<%= pkg.name %>/']
        }
      }
    }

  });
  //加载插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  //注册
  grunt.registerInitTask('default', ['clean', 'copy', 'sass', 'autoprefixer', 'concat', 'uglify', 'cssmin', 'filerev', 'imagemin', 'usemin', 'htmlmin', 'connect', 'watch']);
};