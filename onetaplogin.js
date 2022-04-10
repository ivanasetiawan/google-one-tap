/*
* clientId (String): Your application's client ID
* cancelOnTapOutside (Boolean): Cancels the prompt if the user clicks outside the prompt.
* context (String): The title in the One Tap prompt. Allowed parameters: "signin", "signup", "use"
* 
* Usage: 
* OneTapLogin({
* 	clientId: '522692714268-9peb532q1urebtr3sagqnm2qdvpl6en7.apps.googleusercontent.com',
* 	isLoggedIn: false,
* }, callback)
*/
function googleOneTap (options = {} , callback) {
	let isLoaded = false;

	const _init = () => {
		const ctx = options.context || 'signin';
		const context = ['signin', 'signup', 'use'].includes(ctx)
				? ctx
				: 'signin';
		const cancel_on_tap_outside = options.cancelOnTapOutside ? options.cancelOnTapOutside : false;
		const client_id = options.clientId ? options.clientId : null;

		window.onload = function () {
			window.google.accounts.id.initialize({
				client_id,
				cancel_on_tap_outside,
				context,
				callback,
			});
			
			window.google.accounts.id.prompt();
		};
	}

	const _loadLibrary = () => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
		script.addEventListener('load', () => {
				isLoaded = true;
		});
		_init();
	};

	const _load = () => {
		return !isLoaded ? _loadLibrary() : null;
	};

	const _checkExecutable = (rules) => {
		if (rules) return;
		_load();
  };

	/**
	 * Rules to not execute:
	 * User is already logged in, or client ID is not defined
	 */
		const rules = options.isLoggedIn || options.clientId && options.clientId.length <= 0;
	_checkExecutable(rules);
}

export default googleOneTap;