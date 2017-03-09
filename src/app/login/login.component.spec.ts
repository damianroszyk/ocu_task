import {LoginComponent} from './login.component';
import {TestBed} from '@angular/core/testing';
import {AuthService} from '../services/auth.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppModule} from '../app.module';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
    let fixture;
    let comp;
    let spy;
    let authService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpModule],
            schemas: [ NO_ERRORS_SCHEMA ],
            declarations: [ LoginComponent ],
            providers:    [ AuthService ],
        });

        fixture = TestBed.createComponent(LoginComponent);
        comp    = fixture.componentInstance;

        // LoginComponent actually injected into the component
        authService = fixture.debugElement.injector.get(AuthService);

        // Setup spy on the `getQuote` method
        spy = spyOn(authService, 'login')
            .and.returnValue(Promise.resolve({xx: 'test'}));

    });

    it('should not show quote before OnInit', () => {
        expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
    });

    it('should be called with parameters', () => {
        let e = new Event('click');

        comp.login(e, 'test', 'test');

        expect(authService.login).toHaveBeenCalledWith('test', 'test');
    });
});
