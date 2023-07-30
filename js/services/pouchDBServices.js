/*global app, PouchDB*/
/*jslint nomen: true*/
app.factory('pouchDBServices', ['$q', '$http', function ($q, $http) {
    'use strict';

    var CONFIG_DB_NAME = 'markovDictionaries',
        isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        db = (isiOS) ? new PouchDB(CONFIG_DB_NAME, {
            adapter: 'fruitdown'
        }) : new PouchDB(CONFIG_DB_NAME),

        loadDefaultDictionaries = function () {
            var deferred = $q.defer();

            $http.get('data/defaultDictionaries.json')
                .then(function (result) {
                    var i;
                    for (i = 0; i < result.data.length; i += 1) {
                        result.data[i].creationDate = new Date().getTime();
                    }

                    db.bulkDocs(result.data).then(function (result) {
                        db.allDocs({
                            include_docs: true
                        }).then(function (response) {
                            deferred.resolve(response);
                        });
                    });
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

    return {
        getAllDictionaries: function () {

            var deferred = $q.defer();
            db.allDocs({
                include_docs: true
            }).then(function (result) {

                //add default presets on first load
                if (result.total_rows === 0) {
                    $q.when(loadDefaultDictionaries()).then(function (response) {
                        deferred.resolve(response);
                    });
                } else {
                    deferred.resolve(result);
                }

            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },

        saveDictionary: function (id, title, values) {
            var deferred = $q.defer();

            if (typeof id === 'undefined') {
                db.post({
                    title: title,
                    values: values,
                    creationDate: new Date().getTime()

                }).then(function (response) {
                    deferred.resolve(response);

                }).catch(function (err) {
                    deferred.reject(err);
                });

            } else {
                db.get(id).then(function (doc) {
                    return db.put({
                        _id: id,
                        _rev: doc._rev,
                        title: title,
                        values: values,
                        creationDate: doc.creationDate
                    });
                }).then(function (response) {
                    deferred.resolve(response);

                }).catch(function (err) {
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        },

        renameDictionary: function (id, newTitle) {
            var deferred = $q.defer();

            db.get(id).then(function (doc) {
                return db.put({
                    _id: id,
                    _rev: doc._rev,
                    title: newTitle,
                    values: doc.values,
                    creationDate: doc.creationDate
                });
            }).then(function (response) {
                deferred.resolve(response);

            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },

        removeDictionary: function (id) {
            var deferred = $q.defer();

            db.get(id).then(function (doc) {
                deferred.resolve(db.remove(doc));

            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },

        insertDictionaries: function (dictionaries) {
            var deferred = $q.defer(),
                i;
            for (i = 0; i < dictionaries.length; i += 1) {
                dictionaries[i].creationDate = new Date().getTime();
            }

            db.bulkDocs(dictionaries).then(function (result) {
                db.allDocs({
                    include_docs: true
                }).then(function (response) {
                    deferred.resolve(response);
                });

            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },

        reset: function () {
            var deferred = $q.defer();

            db.destroy().then(function () {
                db = (isiOS) ? new PouchDB(CONFIG_DB_NAME, {
                    adapter: 'fruitdown'
                }) : new PouchDB(CONFIG_DB_NAME);
                $q.when(loadDefaultDictionaries()).then(function (response) {
                    deferred.resolve(response);
                });
            }).catch(function (err) {
                deferred.resolve(deferred.reject(err));
            });

            return deferred.promise;
        }
    };
}]);
