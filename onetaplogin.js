/*
* options (Object): 
*   - isLoggedIn (Boolean): Logged in status
*   - clientId (String): Your Google's credential client ID
* callback (Function)
* 
* Usage: 
* new Vue.use(OneTapLogin, {
*   id: 'Client ID',
*   isLoggedIn: false,
* }, callback);
*/

export default {
    install(_, options, callback) {
        this.options = options;
        this.callback = callback;
        this.isLoaded = false;

        /**
         * Rules to not execute:
         * User is already logged in, or client ID is not defined.
         */
        const rules =
            this.options?.isLoggedIn || !this.options?.clientId;
        this._checkExecutable(rules);
    },

    /**
     * Check if the plugin is executable based on the `rules`.
     */
    _checkExecutable(rules) {
        if (rules) return;
        this._load();
    },

    /**
     * Load method to check if the plugin is not yet loaded.
     * If not yet, load the library,
     * If already loaded, do not load the library
     */
    _load() {
        return !this.isLoaded ? this._loadLibrary() : null;
    },

    /**
     * Load the library method.
     * Based on this: https://developers.google.com/identity/gsi/web/guides/client-library
     */
    _loadLibrary() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.addEventListener('load', () => {
            this.isLoaded = true;
        });
        this._init();
    },

    /**
     * Initialise the Google One Tap
     */
    _init() {
        const ctx = this.options?.context || 'signin'; // eslint-disable-line
        const context = ['signin', 'signup', 'use'].includes(ctx)
            ? ctx
            : 'signin';
        const callback = this.callback;
        /* eslint-disable */
        const client_id = this.options?.clientId; // eslint-disable-line
        window.onload = function () {
            window.google.accounts.id.initialize({
                client_id,
                cancel_on_tap_outside: false,
                context,
                callback,
            });
            window.google.accounts.id.prompt();
        };
        /* eslint-enable */
    },
};