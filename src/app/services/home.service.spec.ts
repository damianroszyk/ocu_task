import {HomeService} from './home.service';
import {inject, TestBed} from '@angular/core/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions, Http, BaseRequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('HomeService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                HomeService,
                {
                    provide: Http,
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions
            ]
        });
    });


    it('should return an Observable',
        inject([HomeService, MockBackend], (homeService, mockBackend) => {
            const mockResponse = [
                {id: 0, name: 'batch 1'},
                {id: 1, name: 'batch 2'}
            ];

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            let batches;
            homeService.getBatches().subscribe((v) => batches = v);

            expect(batches.length).toBe(2);
            expect(batches[1].name).toBe('batch 2');
        }));
});