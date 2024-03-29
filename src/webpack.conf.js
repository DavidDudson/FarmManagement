var path = require('path');

var WebpackNotifierPlugin = require('webpack-notifier');

var homedir = path.resolve(__dirname + '/../');

var fs = require('fs');

console.log("Homedir: " + homedir);
console.log("ThisDir: " + __dirname);

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

console.log(getDirectories(homedir));
console.log(getDirectories(__dirname));

console.log("Entry:" + path.resolve(homedir, 'src/client/app/app.js'));
console.log("Output:" + path.resolve(homedir, 'dist/public'));

module.exports = {
    entry: {
        bundle: path.resolve(homedir, 'src/client/app/app.js')
    },
    output: {
        path: path.resolve(homedir, 'dist/public'),
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.json/, loader: "json"},
            {test: /\.(scss|sass)$/, loader: "style!css?sourceMap!resolve-url?sourceMap!sass?sourceMap"},
            {test: /\.jsx?$/, loader: "babel"},
            {test: /\.html$/, loader: "html"},
            {test: /\.(png|jpg|gif|bmp)$/, loader: "url?prefix=img/&limit=5000"},
            {
                test: /\.(woff|woff2)(\?|$)/,
                loader: "url?limit=5000&minetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {test: /\.(eot|ttf|svg)(\?|$)/, loader: "file?prefix=font/&name=fonts/[name].[ext]"}
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(homedir, "node_modules/compass-mixins/lib")
        ]
    },
    resolve: {
        root: [homedir, path.resolve(homedir + "/node_modules")],
        alias: {
            utilities: "src/client/app/util",
            app: "src/client/app",
            components: "src/client/app/components",
            client: "src/client",
            images: "src/client/images",
            normalize: "normalize.css/normalize.css",
            angular_material_css: "angular-material/angular-material.min.css",
            angular_chart_css: "angular-chart.js/dist/angular-chart.min.js",
            angular_chart: "angular-chart.js/dist/angular-chart.min.css",
            angular_data_table_css: "angular-material-data-table/dist/md-data-table.css",
            bootstrap_css: "bootstrap/dist/css/bootstrap.min.css",
            angular_material_design_icons: "material-design-icons-iconfont/dist/material-design-icons.scss",
            accordion: "v-accordion/dist/v-accordion.min.js",
            accordion_css: "v-accordion/dist/v-accordion.min.css",
            xedit: "angular-xeditable-npm/dist/js/xeditable.min.js",
            xedit_css: "angular-xeditable-npm/dist/css/xeditable.css"
        },
        extensions: ['', '.js', '.scss', 'css', 'html']
    },
    plugins: [new WebpackNotifierPlugin()]
};
