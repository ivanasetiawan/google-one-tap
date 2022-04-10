import { createLocalVue } from '@vue/test-utils';
import OneTapLogin from './onetaplogin';

describe('One Tap Login', () => {
    const localVue = createLocalVue();
    let _loadSpy;
    let _loadLibrarySpy;
    let _checkExecutableSpy;
    let appendChild;

    beforeEach(() => {
        document.body.innerHTML = '<body><script></script></body>';
        _checkExecutableSpy = jest.spyOn(OneTapLogin, '_checkExecutable');
        _loadSpy = jest.spyOn(OneTapLogin, '_load');
        _loadLibrarySpy = jest.spyOn(OneTapLogin, '_loadLibrary');
        appendChild = jest.spyOn(document.body, 'appendChild');
        localVue.use(OneTapLogin);
    });

    test('should be installed properly', () => {
        expect(typeof localVue._installedPlugins[0].install).toBe('function');
    });

    test('should check the rules condition before loading the client library', () => {
        const rulesMock = true;
        expect(_checkExecutableSpy).toBeCalledWith(rulesMock);
    });

    test('should not load the client library from google if rules to not execute is true', () => {
        const rulesMock = true;
        OneTapLogin._checkExecutable(rulesMock);
        expect(_loadSpy).not.toBeCalled();
    });

    test('should load the client library from google if rules to not execute is false', () => {
        const rulesMock = false;
        OneTapLogin._checkExecutable(rulesMock);
        expect(_loadSpy).toBeCalled();
    });

    test('should load the client library from google', () => {
        expect(_loadLibrarySpy).toBeCalled();
    });

    test('should append cookie law script on the document body', () => {
        expect(appendChild).toBeCalledWith(
            expect.objectContaining({
                type: 'text/javascript',
                src: 'https://accounts.google.com/gsi/client',
                async: true,
                defer: true,
            })
        );
    });
});