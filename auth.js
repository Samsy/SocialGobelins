// auth.js

// Module chargé de l'authentification.

exports.authenticate = function(request, response, next) {
	var err = request.session.error,
		msg = request.session.success;
	delete request.session.error;
	delete request.session.success;
	res.locals.message = '';

	if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
	if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  	next();
};