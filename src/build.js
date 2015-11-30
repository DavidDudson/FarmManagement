module.exports = () => {

    var WebpackNotifierPlugin = require('webpack-notifier');

    var rm = require('rimraf');
    var path = require('path');
    var webpack = require('webpack');
    var homedir = path.resolve(__dirname + "/../");


    rm(path.resolve('./dist'), (err) => {
        if (err) console.log("Failed to delete dist")
    });

    console.log("Webpack Rebuilding...\n");

    webpack({
        entry: path.resolve(homedir ,'src/client/app/app.js'),
        debug: true,
        devtool: 'source-map',
        output: {
            path: path.resolve(homedir, 'dist/public'),
            publicPath:  '/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {test: /\.css$/, loader: "style!css"},
                {test: /\.(scss|sass)$/, loader: "style!css?sourceMap!resolve-url?sourceMap!sass?sourceMap"},
                {test: /\.jsx?$/, loader: "babel", query: {presets: ['es2015']}},
                {test: /\.html$/, loader: "html"},
                {test: /\.(png|jpg|gif|bmp)$/, loader: "url?prefix=img/&limit=5000"},
                {test: /\.(woff|woff2)(\?|$)/, loader: "url?limit=5000&minetype=application/font-woff&name=fonts/[name].[ext]"},
                {test: /\.(eot|ttf|svg)(\?|$)/, loader: "file?prefix=font/&name=fonts/[name].[ext]"}
            ]
        },
        sassLoader: {
            includePaths: [
                path.resolve(homedir, "node_modules/compass-mixins/lib")
            ]
        },
        resolve: {
            root: {
                __dirname
            },
            alias: {
                "angular_material_css": "angular-material/angular-material.min.css",
                "angular_data_table_css": "angular-material-data-table/dist/md-data-table.min.css"
            },
            extensions: ['', '.js', '.scss']

        },
        plugins: [
            new WebpackNotifierPlugin()
        ]
    }, (err, stats) => {
        if (err) console.warn(err);

        console.log("\nVendor module files: \n");

        // Ignore loader files, since they don't really matter,
        // remove that statement if debugging
        stats.compilation.fileDependencies
            .filter(f => f.includes("node_modules") && !f.includes("loader"))
            .map(f => f.replace(path.join(homedir, "node_modules"), ""))
            .forEach(f => console.log(" - " + f));

        console.log("\nApp files: \n");

        stats.compilation.fileDependencies
            .filter(f => f.includes("client"))
            .map(f => f.replace(path.join(homedir, "src", "client"), ""))
            .forEach(f => console.log(" - " + f));

        if (!!stats.compilation.missingDependencies.count) {
            console.warn("\nMissing Dependencies, usually a loader/path problem\n");
            stats.compilation.missingDependencies
                .forEach(f => console.log(" - " + f));
        }

        if (!!stats.compilation.errors.count) {
            console.warn("\nWebpack encountered errors\n");
            stats.compilation.errors
                .forEach(e => console.warn(e.module.error));
        }
    });
};