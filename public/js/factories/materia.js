farol.factory('Materia', function($resource, API, TokenHandler) {
    var resource = $resource(API.URL + '/v1/materias/:id', {id: '@_id'}, {
        update: {
            method: 'PUT'
        }
    });

    resource = TokenHandler.wrapActions(resource, ['update', 'save', 'delete']);
    return resource;
})
