/*
client_id (String): Your application's client ID
auto_select (Boolean): Enables automatic selection.
cancel_on_tap_outside (Boolean): Cancels the prompt if the user clicks outside the prompt.
context (String): The title in the One Tap prompt. Allowed parameters: "signin", "signup", "use"
*/

function googleOneTap ({ client_id, auto_select = false, cancel_on_tap_outside = false, context = 'signin' }, callback) {
	const contextValue = ['signin', 'signup', 'use'].includes(context) ? context : 'signin';

	let googleScript = document.createElement('script');
	googleScript.setAttribute('src', 'https://accounts.google.com/gsi/client');
	document.head.appendChild(googleScript);

	window.onload = function () {
		if (client_id) {
			window.google.accounts.id.initialize({
				client_id: client_id,
				callback: callback,
				auto_select: auto_select,
				cancel_on_tap_outside: cancel_on_tap_outside,
				context: contextValue
			});
			window.google.accounts.id.prompt();
		} else {
			console.error('client_id is missing');
		}
	};
}

export default googleOneTap;