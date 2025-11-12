import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { DomainName } from "./PathTools";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(
        private cookieservice: CookieService,

    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookieservice.get('NovinatraBroker-cookie');
        const myrequest = req.clone({
            url: DomainName + req.url,
            headers:req.headers.append('Authorization','Bearer '+ token)
        }
        );

        return next.handle(myrequest);
    }

}