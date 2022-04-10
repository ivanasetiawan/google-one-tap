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
};