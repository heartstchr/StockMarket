// These are the public assets. Goal is to serve css, js, partials, images, or bower packages.
exports.register = function(server, options, next){

    server.route([
        {
            method: 'GET',
            path: '/views/{path*}',
            config: {
                handler: {
                    directory: { path: './server/views' }
                },
                id: 'views'
            }
        },
        {
            method: 'GET',
            path: '/images/{path*}',
            config: {
                handler: {
                    directory: { path: './public/images' }
                },
                id: 'images'
            }
        },
        {
            method: 'GET',
            path: '/css/{path*}',
            config: {
                handler: {
                    directory: { path: './public/css' }
                },
                id: 'css'
            }
        },
        {
            method: 'GET',
            path: '/js/{path*}',
            config: {
                handler: {
                    directory: { path: './public/js' }
                },
                id: 'js'
            }
        },
        {
            method: 'GET',
            path: '/angular/{path*}',
            config: {
                handler: {
                    directory: { path: './server/angular' }
                },
                id: 'angular'
            }
        },
        {
            method: 'GET',
            path: '/bower_components/{path*}',
            config: {
                handler: {
                    directory: { path: './bower_components' }
                },
                id: 'bower'
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'assets'
};