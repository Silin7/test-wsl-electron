module.exports = {
    configureWebpack: {
        // Configuration applied to all builds
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                "nsis": {
                    "oneClick": false,
                    "allowToChangeInstallationDirectory": true
                },
                // extraResources: ['src/datastore/index.js']
            },
            chainWebpackMainProcess: (config) => {
                // Chain webpack config for electron main process only
            },
            chainWebpackRendererProcess(config) {
                config.plugin('define').tap(args => {
                    delete args[0]['process.env'].BASE_URL
                    return args
                })
                // Chain webpack config for electron renderer process only
                // The following example will set IS_ELECTRON to true in your app
                // config.plugin('define').tap((args) => {
                //     args[0]['IS_ELECTRON'] = true
                //     return args
                // })
            },
            // Use this to change the entrypoint of your app's main process
            // mainProcessFile: 'src/background.js',
            // Provide an array of files that, when changed, will recompile the main process and restart Electron
            // Your main process file will be added by default
            // mainProcessWatch: ['src/datastore', 'src/api'],
            // Provide a list of arguments that Electron will be launched with during "electron:serve",
            // which can be accessed from the main process (src/background.js).
            // Note that it is ignored when --debug flag is used with "electron:serve", as you must launch Electron yourself
            // Command line args (excluding --debug, --dashboard, and --headless) are passed to Electron as well
            //mainProcessArgs: ['--arg-name', 'arg-value']
        }
    }
}
