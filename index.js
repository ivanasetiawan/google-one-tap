export default {
    install(_, options, callback) {
        /**
         * Do not execute if: Development mode and user is already logged in
         */
        const isNotExecutable = options?.isLoggedIn;
        if (isNotExecutable) return;

        const defaultId = '522692714268-i6fd2e2j6h8qkbhkskfovkn1uhmcuikf.apps.googleusercontent.com';
        this.clientId = options?.id || defaultId;
        this.isLoaded = false;
        this.context = options?.context || 'signin';
        this.callback = callback;
        this._load();
    },

    _load: function () {
        return !this.isLoaded ? this._loadLibrary() : null;
    },

    _loadLibrary: function() {
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

    _init: function() {
        const context = ['signin', 'signup', 'use'].includes(this.context) ? this.context : 'signin';
        const callback = this.callback;
        const client_id = this.clientId;
        window.onload = function () {
            window.google.accounts.id.initialize({
                client_id,
				auto_select: false,
				cancel_on_tap_outside: false,
				context,
                callback,
            });
            window.google.accounts.id.prompt();
        };
    }
};
