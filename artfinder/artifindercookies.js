// GTAG
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
'ad_storage': 'denied',
'analytics_storage': 'denied',
'ad_user_data': 'denied',
'ad_personalization': 'denied',
});

//Čekání na defaultní hodnoty
window.consentDefaultsSet = true;

window.waitingForConsent = window.waitingForConsent || [];
window.runAfterConsent = function (callback) {
    if (window.consentDefaultsSet) {
        callback();
    } else {
        window.waitingForConsent.push(callback);
    }
};

window.waitingForConsent.forEach(function (cb) {
    try { cb(); } catch (e) { console.error(e); }
});
window.waitingForConsent = [];


// UET MS Ads
window.uetq = window.uetq || [];
window.uetq.push('consent', 'default', {
'ad_storage': 'denied'
});

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/tomkr4l/cdn/artfinder/cookieconsent.css';
    var script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cdn.jsdelivr.net/gh/tomkr4l/cdn/artfinder/cookieconsent.js';
    script.onload = function () {
        loadCookieConsent()
    };
    document.querySelector('head').append(link);
    document.querySelector('body').append(script);


function consentGtagUpdate(cookieconsent) {

  /* postavíme mapu souhlasů exactly jak ji GTM očekává */
  const consent = {
    ad_storage:          cookieconsent.allowedCategory('ads')               ? 'granted' : 'denied',
    analytics_storage:   cookieconsent.allowedCategory('analytics')         ? 'granted' : 'denied',
    ad_user_data:        cookieconsent.allowedCategory('ad_user')           ? 'granted' : 'denied',
    ad_personalization:  cookieconsent.allowedCategory('ad_personalization')? 'granted' : 'denied',
  };

gtag('consent', 'update', consent);          // 1) zásadní příkaz pro Google
dataLayer.push({ event: 'gtm.consentUpdate'}); // 2) událost pro trigger v GTM

  /* Pošleme jediný consent-update do gtag */
  if (typeof gtag === 'function') {
    gtag('consent', 'update', consent);
  }

  /* Vyvoláme VÁŠ custom event na který triggery čekají */
  if (Array.isArray(window.dataLayer)) {
    dataLayer.push('consent-update');   // přesně ten, který fungoval v testu
  }

  /* Microsoft Ads */
  window.uetq = window.uetq || [];
  window.uetq.push('consent', 'update', { ad_storage: consent.ad_storage });

  /*
  if (typeof fbq === 'function') {
    consent.ad_storage === 'granted' ? fbq('consent', 'grant')
                                     : fbq('consent', 'revoke');
  }
  */

  if (consent.ad_storage === 'denied') {
    dataLayer.push({ event: 'ads_denied' });
  }
}

    function loadCookieConsent() {
        var cookieconsent = initCookieConsent();
        cookieconsent.run({
            current_lang: 'document',
            autoclear_cookies: true,
            cookie_expiration: 365,
            current_lang: (document.documentElement.getAttribute('lang') || 'cs').toLowerCase().split('-')[0],
            gui_options: {
                consent_modal: {
                    layout: 'box',
                    position: 'middle center',
                    transition: 'slide',
                    swap_buttons: false
                },
                settings_modal: {
                    layout: 'box',
                    transition: 'slide'
                }
            },
            languages: {
                'cs': {
                    consent_modal: {
                        title: '',
                        description: 'Tyto webové stránky používají k poskytování svých služeb soubory cookies, abychom vám zlepšili procházení stránek. Mezi ně patří nezbytně nutné soubory k používání webových stránek, dále pak technologie, které slouží např. k vytváření anonymních statistik, nástrojů třetích stran pro vylepšení vašeho procházení stránek nebo pro inzerci personalizovaných reklam.',
                        primary_btn: {
                            text: 'Souhlasím',
                            role: 'accept_all'
                        },
                        secondary_btn: {
                            text: 'Nastavení',
                            role: 'settings'
                        }
                    },
                    settings_modal: {
                        title: 'Nastavení cookies',
                        save_settings_btn: 'Uložit nastavení',
                        accept_all_btn: 'Povolit vše',
                        reject_all_btn: 'Zamítnout vše',
                        close_btn_label: 'Zavřít',
                        cookie_table_headers: [
                            {col1: 'Název'},
                            {col2: 'Expirace'},
                            {col3: 'Popis'},
                        ],
                        blocks: [
                            {
                                title: 'Co jsou cookies',
                                description: 'Cookies jsou malé soubory s malým množstvím dat, které jsou ukládány ve vašem koncovém zařízení (počítači, tabletu, mobilním telefonu apod). Tyto soubory umožňují správné fungování systému případně usnadňují práci se systémem jak návštěvníkům, tak i správcům systému. Cookies nejsou nebezpečné pro dané zařízení, ale ze svého principu je jejich zpracování podřízeno ochraně osobních údajů. Na této stránce máte možnost přizpůsobit soubory cookie dle jednotlivých kategorií, v souladu s vlastními preferencemi.'
                            }, {
                                title: 'Povinné pro funkčnost stránek',
                                description: 'Soubory cookie, které jsou nutné pro funkčnost stránek a musí být povolené. Patří k nim soubory cookie, které umožňují si vás zapamatovat při procházení v rámci jedné relace.',
                                toggle: {
                                    value: 'necessary',
                                    enabled: true,
                                    readonly: true
                                },
                            }, {
                                title: 'Preferenční a statistické',
                                description: 'Tyto soubory nám pomáhají v měření používání webu, vytváření anonymních statistik a používáme je zároveň i pro zlepšení funkcí stránek pro vás. Jde například o Google Analytics.',
                                toggle: {
                                    value: 'analytics',
                                    enabled: false,
                                    readonly: false
                                },
                            }, {
                                title: 'Marketingové',
                                description: 'Soubory nám pomáhají rozšiřovat povědomí pomocí reklamy relevantním uživatelům. Zároveň nám umožňují přesnější cílení reklam a lepší vyhodnocení kampaní.',
                                toggle: {
                                    value: 'ads',
                                    enabled: false,
                                    readonly: false
                                },}, {
                                title: 'Uživatelské data',
                                description: 'Nastaví souhlas s odesíláním údajů o uživatelích souvisejících s reklamami.',
                                toggle: {
                                    value: 'ad_user',
                                    enabled: false,
                                    readonly: false
                                }, }, {
                                title: 'Personalizovaná inzerce',
                                description: 'Slouží k nastavení souhlasu s personalizovanou inzercí.',
                                toggle: {
                                    value: 'ad_personalization',
                                    enabled: false,
                                    readonly: false
                                },
                            },
                        ]
                    }
                },
                /* Polština */
                'pl': {
                    consent_modal: {
                        title: '',
                        description: 'Ta strona internetowa wykorzystuje pliki cookie w celu świadczenia swoich usług i poprawy komfortu przeglądania. Obejmują one pliki niezbędne do korzystania ze strony internetowej, a także technologie wykorzystywane np. do tworzenia anonimowych statystyk, narzędzi innych firm służących do poprawy komfortu przeglądania lub wyświetlania spersonalizowanych reklam.',
                        primary_btn: {
                            text: 'Zgadzam się',
                            role: 'accept_all'
                        },
                        secondary_btn: {
                            text: 'Ustawienia',
                            role: 'settings'
                        }
                    },
                    settings_modal: {
                        title: 'Ustawienia plików cookie',
                        save_settings_btn: 'Zapisz ustawienia',
                        accept_all_btn: 'Wszystko odblokować',
                        reject_all_btn: 'Odrzuć wszystkie',
                        close_btn_label: 'Zamknij',
                        cookie_table_headers: [
                            {col1: 'Nazwa'},
                            {col2: 'Data ważności'},
                            {col3: 'Opis'},
                        ],
                        blocks: [
                            {
                                title: 'Czym są pliki cookie?',
                                description: 'Pliki cookie to niewielkie pliki zawierające niewielką ilość danych, które są zapisywane na urządzeniu końcowym użytkownika (komputerze, tablecie, telefonie komórkowym itp.). Pliki te umożliwiają prawidłowe funkcjonowanie systemu lub ułatwiają pracę z systemem odwiedzającym i administratorom systemu. Pliki cookie nie stanowią zagrożenia dla danego urządzenia, ale ich przetwarzanie podlega z natury rzeczy przepisom o ochronie danych osobowych. Na tej stronie mają Państwo możliwość dostosowania plików cookie do własnych preferencji według różnych kategorii.'
                            }, {
                                title: 'Niezbędne do funkcjonowania strony internetowej',
                                description: 'Pliki cookie niezbędne do funkcjonowania strony internetowej, które muszą być aktywowane. Obejmują one pliki cookie, które pozwalają nam zapamiętać użytkownika podczas przeglądania strony w ramach jednej sesji.',
                                toggle: {
                                    value: 'necessary',
                                    enabled: true,
                                    readonly: true
                                },
                            }, {
                                title: 'Preferowane i statystyczne',
                                description: 'Pliki te pomagają nam mierzyć wykorzystanie strony internetowej, tworzyć anonimowe statystyki i ulepszać funkcje strony internetowej dla użytkowników. Należy do nich np. Google Analytics.',
                                toggle: {
                                    value: 'analytics',
                                    enabled: false,
                                    readonly: false
                                },
                            }, {
                                title: 'Marketing',
                                description: 'Pliki te pomagają nam wyświetlać reklamy odpowiednim użytkownikom. Pozwalają nam również precyzyjniej kierować reklamy i lepiej oceniać kampanie.',
                                toggle: {
                                    value: 'ads',
                                    enabled: false,
                                    readonly: false
                                },}, {
                                title: 'Dane użytkownika',
                                description: 'Określa zgodę na wysyłanie danych użytkownika związanych z reklamami.',
                                toggle: {
                                    value: 'ad_user',
                                    enabled: false,
                                    readonly: false
                                }, }, {
                                title: 'Spersonalizowane reklamy',
                                description: 'Służy do wyrażenia zgody na spersonalizowane reklamy.',
                                toggle: {
                                    value: 'ad_personalization',
                                    enabled: false,
                                    readonly: false
                                },
                            },
                        ]
                    }
                },
                /* Němčina */
                'de': {
                    consent_modal: {
                        title: '',
                        description: 'Diese Website verwendet Cookies, um ihre Dienste anzubieten und Ihr Surferlebnis zu verbessern. Dazu gehören Dateien, die für die Nutzung der Website unbedingt erforderlich sind, sowie Technologien, die z. B. zur Erstellung anonymer Statistiken, für Tools von Drittanbietern zur Verbesserung Ihres Browsing-Erlebnisses oder zur Schaltung personalisierter Werbung verwendet werden.',
                        primary_btn: {
                            text: 'Ich stimme zu',
                            role: 'accept_all'
                        },
                        secondary_btn: {
                            text: 'Einstellungen',
                            role: 'settings'
                        }
                    },
                    settings_modal: {
                        title: 'Einstellungen für Cookies',
                        save_settings_btn: 'Einstellungen speichern',
                        accept_all_btn: 'Alles freischalten',
                        reject_all_btn: 'Alle ablehnen',
                        close_btn_label: 'Schließen',
                        cookie_table_headers: [
                            {col1: 'Name'},
                            {col2: 'Verfallsdatum'},
                            {col3: 'Beschreibung'},
                        ],
                        blocks: [
                            {
                                title: 'Was sind Cookies?',
                                description: 'Cookies sind kleine Dateien mit einer geringen Menge an Daten, die auf Ihrem Endgerät (Computer, Tablet, Mobiltelefon usw.) gespeichert werden. Diese Dateien ermöglichen das ordnungsgemäße Funktionieren des Systems oder erleichtern den Besuchern und Systemadministratoren die Arbeit mit dem System. Cookies sind für das betreffende Gerät nicht gefährlich, aber ihre Verarbeitung unterliegt naturgemäß dem Datenschutz. Auf dieser Seite haben Sie die Möglichkeit, die Cookies nach den verschiedenen Kategorien Ihren eigenen Präferenzen anzupassen.'
                            }, {
                                title: 'Für die Funktionalität der Website erforderlich',
                                description: 'Cookies, die für die Funktionalität der Website erforderlich sind und aktiviert werden müssen. Dazu gehören Cookies, die es uns ermöglichen, uns an Sie zu erinnern, wenn Sie innerhalb einer einzigen Sitzung surfen.',
                                toggle: {
                                    value: 'necessary',
                                    enabled: true,
                                    readonly: true
                                },
                            }, {
                                title: 'Bevorzugte und statistische',
                                description: 'Diese Dateien helfen uns, die Nutzung der Website zu messen, anonyme Statistiken zu erstellen und die Funktionen der Website für Sie zu verbessern. Dazu gehört z. B. Google Analytics.',
                                toggle: {
                                    value: 'analytics',
                                    enabled: false,
                                    readonly: false
                                },
                            }, {
                                title: 'Marketing',
                                description: 'Die Dateien helfen uns dabei, Werbung bei relevanten Nutzern zu schalten. Sie ermöglichen es uns auch, die Werbung genauer auszurichten und die Kampagnen besser auszuwerten.',
                                toggle: {
                                    value: 'ads',
                                    enabled: false,
                                    readonly: false
                                },}, {
                                title: 'Benutzerdaten',
                                description: 'Legt die Zustimmung zum Senden von werbebezogenen Nutzerdaten fest.',
                                toggle: {
                                    value: 'ad_user',
                                    enabled: false,
                                    readonly: false
                                }, }, {
                                title: 'Personalisierte Werbung',
                                description: 'Sie wird verwendet, um die Zustimmung zu personalisierter Werbung zu erteilen.',
                                toggle: {
                                    value: 'ad_personalization',
                                    enabled: false,
                                    readonly: false
                                },
                            },
                        ]
                    }
                },
                /* Angličtina */
                'en': {
                    consent_modal: {
                        title: '',
                        description: 'This website uses cookies to provide its services to improve your browsing experience. These include files that are strictly necessary to use the website, as well as technologies that are used, for example, to generate anonymous statistics, third-party tools to improve your browsing experience or to advertise personalised advertisements.',
                        primary_btn: {
                            text: 'Agree',
                            role: 'accept_all'
                        },
                        secondary_btn: {
                            text: 'More options',
                            role: 'settings'
                        }
                    },
                    settings_modal: {
                        title: 'Cookies settings',
                        save_settings_btn: 'Save settings',
                        accept_all_btn: 'Enable all',
                        reject_all_btn: 'Reject all',
                        close_btn_label: 'Close',
                        cookie_table_headers: [
                            {col1: 'Name'},
                            {col2: 'Expiration'},
                            {col3: 'Description'},
                        ],
                        blocks: [
                            {
                                title: 'What are cookies',
                                description: 'Cookies are small files with a small amount of data that are stored on your end device (computer, tablet, mobile phone, etc.). These files enable the system to function properly or make it easier for visitors and system administrators to work with the system. Cookies are not dangerous for the device in question, but by their very nature their processing is subject to data protection. On this page you have the possibility to customize cookies according to the different categories, in accordance with your own preferences.'
                            }, {
                                title: 'Required for site functionality',
                                description: 'Cookies that are necessary for the functionality of the site and must be enabled. These include cookies that allow us to remember you when you browse within a single session.',
                                toggle: {
                                    value: 'necessary',
                                    enabled: true,
                                    readonly: true
                                },
                            }, {
                                title: 'Preference and statistical',
                                description: 'These cookies assist us in measuring site usage, generating anonymous statistics and we also use them to improve site features for you. These include, for example, Google Analytics.',
                                toggle: {
                                    value: 'analytics',
                                    enabled: false,
                                    readonly: false
                                },
                            }, {
                                title: 'Marketing',
                                description: 'The files help us spread awareness by advertising to relevant users. They also allow us to target ads more accurately and better evaluate campaigns.',
                                toggle: {
                                    value: 'ads',
                                    enabled: false,
                                    readonly: false
                                },
                            }, {
                                title: 'User data',
                                description: 'Set consent to send user data related to advertisements.',
                                toggle: {
                                    value: 'ad_user',
                                    enabled: false,
                                    readonly: false
                                },
                            }, {
                                title: 'Personalized advertising',
                                description: 'Used to set consent to personalized advertising.',
                                toggle: {
                                    value: 'ad_personalization',
                                    enabled: false,
                                    readonly: false
                                },
                            }
                        ]
                    }
                }
            },


            onFirstAction: function (user_preferences, cookie) {
            },
            onAccept: function (cookie) {
                consentGtagUpdate(cookieconsent);
            },
            onChange: function (cookie, changed_preferences) {
                consentGtagUpdate(cookieconsent);
            },
        });
    }


(function() {
  // 1) Získání GTM-ID z URL parametru
  var script = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  var url = new URL(script.src, window.location.href);
  var gtmId = url.searchParams.get('id');

  if (gtmId) {
    // 2) Vložení GTM <script> do <head>
    var headScript = document.createElement('script');
    headScript.innerHTML =
      "(function(w,d,s,l,i){"+
        "w[l]=w[l]||[];w[l].push({'gtm.start':"+
        "new Date().getTime(),event:'gtm.js'});"+
        "var f=d.getElementsByTagName(s)[0],"+
            "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';"+
        "j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;"+
        "f.parentNode.insertBefore(j,f);"+
      "})(window,document,'script','dataLayer','" + gtmId + "');";
    document.head.appendChild(headScript);

    // 3) Vložení GTM <noscript> do <body>
    var nos = document.createElement('noscript');
    nos.innerHTML =
      '<iframe src="https://www.googletagmanager.com/ns.html?id=' + gtmId + '"' +
        ' height="0" width="0" style="display:none;visibility:hidden"></iframe>';
    document.body.insertBefore(nos, document.body.firstChild);
  }
})();
