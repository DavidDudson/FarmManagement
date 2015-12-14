module.exports = () => {

    var _ = require('lodash');
    var rm = require('rimraf');
    var path = require('path');
    var webpack = require('webpack');
    var webpackConf = require('./webpack.conf.js');
    var homedir = path.resolve(__dirname + "/../");


    rm(path.resolve('./dist'), (err) => {
        if (err) console.log("Failed to delete dist")
    });

    console.log("Webpack Rebuilding...\n");


    webpack(webpackConf, (err, stats) => {
        if (err) console.warn(err);

        console.log("\nVendor modules: \n");

        // Ignore loader files, since they don't really matter,
        // remove that statement if debugging
        var vendor = stats.compilation.fileDependencies
            .filter(f => f.includes("node_modules") && !f.includes("loader"))
            .map(f => f.replace(path.join(homedir, "node_modules"), ""))
            .map(f => f.match(/^\/(.[^\/]*)\//)[1]);

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