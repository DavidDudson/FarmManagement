module.exports = () => {

    var rm = require('rimraf');
    var path = require('path');
    var webpack = require('webpack');

    rm(path.resolve('./dist'), (err) => {
        if (err) console.log("Failed to delete dist")
    });

    console.log("Webpack Rebuilding...\n ");

    webpack({
        entry: './src/client/webpack.js',
        debug: true,
        devtool: 'source-map',
        output: {path: './dist/public', filename: 'bundle.js'},
        module: {
            loaders: [
                {test: /\.css$/, loader: "style!css"},
                {test: /\.(scss|sass)$/, loader: "style!sass"},
                {test: /\.jsx?$/, loader: "babel", query: {presets: ['es2015']}},
                {test: /\.html$/, loader: "html"},
                {test: /\.(png|jpg|gif|bmp)$/, loader: "url?prefix=img/&limit=5000"},
                {test: /\.(woff|woff2)(\?|$)/, loader: "url?limit=5000&minetype=application/font-woff"},
                {test: /\.(eot|ttf|svg)(\?|$)/, loader: "file?prefix=font/"}
            ]
        },
        resolve: {
            root: {
                __dirname
            },
            alias : {
                "angular_material_css": "angular-material/angular-material.min.css",
                "angular_data_table_css": "angular-material-data-table/dist/md-data-table.min.css"
            }

        }
    }, (err, stats) => {
        if (err) console.warn(err);

        console.log("Files included in bundle\n");

        stats.compilation.fileDependencies.forEach((file) => {
            if (~file.indexOf("node_modules")) {
                console.log(file.replace("/Users/DavidD/Dropbox/Projects/SummerSchool/node_modules/",""))
            } else {
                console.log(file.replace("/Users/DavidD/Dropbox/Projects/SummerSchool/src/client/",""))
            }
        });

        if (stats.compilation.missingDependencies.size > 0) {
            console.log("\nMissing Dependencies, usually a loader/path problem\n");
            console.log(stats.compilation.missingDependencies);
        }
    });
};