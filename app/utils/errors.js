exports.badAuth = function(method) {
    return {
        description: 'Bad authentication',
        code: 403
    }
}

exports.notFound = function() {
    return {
        description: 'Resource not found',
        code: 404
    }
}

exports.uploadError = function() {
    return {
        description: 'Error processing upload',
        code: 500
    }
}