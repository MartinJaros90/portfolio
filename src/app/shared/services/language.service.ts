import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();
  private readonly LANG_KEY = 'selectedLanguage';

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    let initialLang = 'en';

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem(this.LANG_KEY);
      const browserLang = translate.getBrowserLang();
      initialLang =
        savedLang || (browserLang?.match(/en|de/) ? browserLang : 'en');
    }

    translate.use(initialLang);
    this.currentLang.next(initialLang);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang.next(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.LANG_KEY, lang);
    }
  }
}
