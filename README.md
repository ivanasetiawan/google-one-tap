# playground

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Implementation with Vue
```vue
import OneTapLogin from 'one-tap-login';
export default {
	mounted() {
		const options = {
			client_id: '___CLIENT_ID___', // required
			auto_select: false, // optional
			cancel_on_tap_outside: false, // optional
			context: 'signin', // optional
		};
		OneTapLogin(options, (response) => {
			// Send response to server
			console.log(response);
		});
	},
};
```