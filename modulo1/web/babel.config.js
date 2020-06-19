module.exports = {
    presets : [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins : [
        '@babel/plugin-transform-runtime'
    ]
}

/*
    '@babel/preset-env'' traduz o JS moderno para o JS compreensível pelo browser utilizado, é importante mencionar que ele só
    irá traduzir o que o browser não é capaz de enteder
 */