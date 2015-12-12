module.exports = () => {

    var WebpackNotifierPlugin = require('webpack-notifier');
    var _ = require('lodash');
    var rm = require('rimraf');
    var path = require('path');
    var webpack = require('webpack');
    var homedir = path.resolve(__dirname + "/../");


    rm(path.resolve('./dist'), (err) => {
        if (err) console.log("Failed to delete dist")
    });

    console.log("Webpack Rebuilding...\n");

    webpack({
        entry: {
            bundle: path.resolve(homedir, 'src/client/app/app.js'),
        },
        debug: true,
        devtool: 'source-map',
        output: {
            path: path.resolve(homedir, 'dist/public'),
            publicPath: '/',
            filename: '[name].js'
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
            root : [homedir],
            alias: {
                util: "src/client/app/util",
                app: "src/client/app",
                client: "src/client",
                angular_material_css: "angular-material/angular-material.min.css",
                angular_data_table_css: "angular-material-data-table/dist/md-data-table.min.css",
            },
            extensions: ['', '.js', '.scss']

        },
        plugins: [
            new WebpackNotifierPlugin()
        ]
    }, (err, stats) => {
        if (err) console.warn(err);

        console.log("\nVendor modules: \n");

        // Ignore loader files, since they don't really matter,
        // remove that statement if debugging
        var vendor = stats.compilation.fileDependencies
            .filter(f => f.includes("node_modules") && !f.includes("loader"))
            .map(f => f.replace(path.join(homedir, "node_modules"), ""))
            .map(f => f.match(/^\/(.[^\/]*)\//)[1])

        _.uniq(vendor)
            .forEach(f => console.log(" - " + f));

        console.log("\nApp files: \n");

        stats.compilation.fileDependencies
            .filter(f => f.includes("client") && !f.includes("test"))
            .map(f => f.replace(path.join(homedir, "src", "client"), ""))
            .forEach(f => console.log(" - " + f));


        console.log("\nClient Test files: \n");

        stats.compilation.fileDependencies
            .filter(f => f.includes("test") && f.includes("client"))
            .map(f => f.replace(path.join(homedir, "test", "client"), ""))
            .forEach(f => console.log(" - " + f));

        console.log("\nServer Test files: \n");

        stats.compilation.fileDependencies
            .filter(f => f.includes("test") && f.includes("server"))
            .map(f => f.replace(path.join(homedir, "test", "server"), ""))
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