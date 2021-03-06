import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {MessagesComponent} from './messages/messages.component';
import {HasRoleDirective} from './has-role.directive';
import {KeycloakBearerInterceptor} from './keycloak-bearer.interceptor';
import {KeycloakService} from './keycloak.service';
import {environment} from '../environments/environment';

export function initKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        await keycloak.init(environment.keycloak);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

registerLocaleData(en);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    HasRoleDirective
  ],
  providers: [
    [
      {provide: APP_INITIALIZER, useFactory: initKeycloak, deps: [KeycloakService], multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: KeycloakBearerInterceptor, multi: true},
      {provide: NZ_I18N, useValue: en_US}
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
