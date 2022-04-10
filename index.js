/*
* options (Object): 
*   - isDev (Boolean): Development mode
*   - isLoggedIn (Boolean): Logged in status
*   - clientId (String): Your Google's credential client ID
* callback (Function)
* 
* Usage: 
* new Vue.use(OneTapLogin, {
*   id: '522692714268-9peb532q1urebtr3sagqnm2qdvpl6en7.apps.googleusercontent.com',
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
         * Development mode and user is already logged in, or client ID is not defined
         */
        const rules =
            (this.options?.isDev && this.options?.isLoggedIn) ||
            !this.options?.clientId;
        this._checkExecutable(rules);
    },
  
    _checkExecutable(rules) {
        if (rules) return;
        this._load();
    },
  
    _load() {
        return !this.isLoaded ? this._loadLibrary() : null;
    },
  
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
  