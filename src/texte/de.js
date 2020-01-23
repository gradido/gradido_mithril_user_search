/*
 * 
__('account created');
__('account not on login-server');
__('email activated');
__('account copied to community');
__('email not activated');
__('account multiple times on login-server');
__('account not on community server');
__('no keys');
 */

/*
 $state = 'account created';
$color = 'secondary';

$state = 'account not on login-server';
$color = 'danger';

$state = 'email activated';
$color = 'primary';

$state = 'account copied to community';
$color = 'success';

$state = 'email not activated';
$color = 'warning';

$state = 'account multiple times on login-server';
$color = 'danger';

$state = 'account not on community server';
$color = 'secondary';

$state = 'no keys';
$color = 'warning';
 */

export default {
  ACCOUNT_STATES: {
    LINES: [
      {
        title: 'Login-Server',
        '+': 'Das Benutzer-Konto liegt auf dem Login-Server!',
        '-': 'Das Benutzer-Konto existiert nicht auf dem Login-Server!'
      },
      {
        title: 'Konto Aktivierung',
        '+': 'Der Benutzer hat sein Konto aktiviert!',
        '-': 'Der Benutzer hat noch nicht auf den Link in seiner E-Mail geklickt!'
      },
      {
        title: 'Schlüsselpaar',
        '+': 'Es wurde bereits ein Schlüsselpaar für den Benutzer erzeugt und ihm eine Passphrase gezeigt!',
        '-': 'Es wurden noch keine Schlüssel und Passphrase für den Benutzer erzeugt!'
      }, 
      {
        title: 'Gemeinschafts-Server',
        '+': 'Das Benutzer-Konto wurde auf auf den Gemeinschafts-Server kopiert!',
        '-': 'Das Benutzer-Konto wurde noch nicht auf den Gemeinschafts-Server kopiert!'
      },
      {
        title: 'Gradidos',
        '+': 'Es können Gradidos an den Benutzer geschickt werden!',
        '-': 'Es können noch keine Gradidos an den Benutzer geschickt werden!',
        '/': 'Es können theoretisch Gradidos an den Benutzer geschickt werden, aber es ist nicht sicher ob er sie verwenden kann!'
      }
    ],
    'account created': {
      title: 'Konto angelegt',
      color: 'secondary',
      description: {
        title: 'Das Konto wurde auf dem Login-Server angelegt, vermutlich durch eine elopage-Anmeldung.',
        lines: ['+', '-', '-', '-', '-']
      },
      todo: {
        title: 'Als nächstes müsste der Benutzer den Link in seiner E-Mail anklicken und den Anweisungen folgen. ',
        lines: [
          'Stimmt die E-Mail Adresse? Hat der Benutzer in seinem Spam-Verzeichnis nachgesehen?',
          '{{verification-resend}}',
          '{{mailto-verification-resend}}'
        ]
      }
    },
    'account not on login-server': {
      title: 'Konto nicht auf Login-Server',
      color: 'danger',
      description: {
        title: 'Das Konto existiert nicht (mehr) auf dem Login-Server: ein Fehler oder es wurde nur teilweise gelöscht.',
        lines: ['-', '+', '+', '+', '/']
      },
      todo: {
        title: 'Wenn der Benutzer seine Passphrase hat, kann er sein Konto auf dem Login-Server wiederherstellen, ansonsten bleibt eigentlich nur das Konto auf dem Gemeinschafts-Server zu löschen',
        lines: [
          'Nachdem das Konto auf dem Login-Server kopiert wurde, bekommt der Benutzer automatisch eine E-Mail mit einem Link zur Kontoaktivierung zugeschickt.',
          '{{copy-from-community-to-login-server}}',
          '<hr>',
          'Es wird nur der Benutzer gelöscht, nicht seine Transaktionen. Zu diesen hat er wieder Zugriff wenn er sein Konto mit Hilfe seiner Passphrase wiederhergestellt hat.',
          '{{user-transactions-overview}}',
          '{{delete-from-community-server}}'
        ]
      }
    },
    'email activated': {
      title: 'Konto aktiviert',
      color: 'primary',
      description: {
        title: 'Das Konto wurde vom Benutzer aktiviert und Schlüssel erzeugt, aber noch nicht auf diesen Gemeinschafts-Server kopiert.',
        lines: ['+', '+', '+', '-', '-']
      },
      todo: {
        title: 'Das Benutzer Konto müsste vom Login-Server auf den Gemeinschafts-Server kopiert werden.',
        lines: [
          '{{copy-from-login-to-community-server}}'
        ]
      }
      
    },
    'account copied to community': {
      title: 'Konto auf Gemeinschafts-Server',
      color: 'success',
      description: {
        title: 'Das Konto ist vollständig aktiviert und es können Gradidos überwiesen werden.',
        lines: ['+','+','+','+','+']
      }
    },
    'email not activated': {
      title: 'Konto nicht aktiviert',
      color: 'warning',
      
      description: {
        title: 'Das Konto wurde auf dem Login-Server angelegt, vermutlich durch eine elopage-Anmeldung. Es wurde aber noch nicht aktiviert!',
        lines: ['+', '-', '-', '-', '-']
      },
      todo: {
        title: 'Als nächstes müsste der Benutzer den Link in seiner E-Mail anklicken und den Anweisungen folgen. ',
        lines: [
          'Stimmt die E-Mail Adresse? Hat der Benutzer in seinem Spam-Verzeichnis nachgesehen?',
          '{{verification-resend}}',
          '{{mailto-verification-resend}}'
        ]
      }
    },
    'account multiple times on login-server': {
      title: 'Konto mehrfach vorhanden',
      color: 'danger',
      description: {
        title: 'Das Konto ist auf dem Login-Server mehrfach vorhanden, das sollte nicht sein, auf dem Login-Server muss ein Fehler passiert sein!!'
      },
      todo: {
        title: 'Du solltest mit dem Entwickler in Kontakt treten.',
        lines: [
          '{{mailto-developer}}'
        ]
      }
    },
    'account not on community server': {
      title: 'Konto nicht auf Gemeinschafts-Server',
      color: 'secondary',
      description: {
        title: 'Das Konto wurde auf dem Login-Server angelegt, aber existiert noch nicht auf dem Gemeinschafts-Server!',
        lines: ['+', null, '-', '-', '-']
      },
      todo: {
        title: 'Das sollte eigentlich nicht passieren, du solltest mit dem Entwickler sprechen.',
        lines: ['{{mailto-developer}}']
      }
    },
    'no keys': {
      title: 'Keine Schlüssel generiert',
      color: 'warning',
      description: {
        title:'Das Konto wurde auf dem Login-Server angelegt, aber es wurden noch keine Schlüssel generiert!',
        lines: ['+', '+', '-', '-', '-']
      },
      todo: {
        title: 'Der Benutzer muss sich mit seinen Daten einloggen, dann müsste er automatisch durch die Schlüsselgenerierung/Konto-Wiederherstellung geführt werden',
        lines: [
          '{{mailto-user-login}}',
          'Wenn der Benutzer sein Passwort vergessen hat, kann er sich auch eine Passwort Reset E-Mail zuschicken lassen.',
          '{{reset-password}}',
          '{{mailto-reset-password}}'
        ]
      }
    }
  },
  NO_USER_FOUND: 'Keine Benutzer gefunden',
  USER_FOUND: 'Benutzer gefunden',
  NAME: 'Name',
  EMAIL: 'E-Mail',
  BALANCE: 'Kontostand',
  PUBLIC_KEY: 'Öffentlicher<br>Schlüssel',
  CREATED: 'Erstellt',
  COPY_FROM_LOGIN_TO_COMMUNITY: 'Vom Login-Server zum Gemeinschafts-Server kopieren',
  COPY_FROM_LOGIN_TO_COMMUNITY_SUCCESS: 'Kontodaten wurden erfolgreich vom Login-Server zu diesem Gemeinschafts-Server kopiert!',
  COPY_FROM_COMMUNITY_TO_LOGIN: 'Vom Gemeinschafts-Server zum Login-Server kopieren',
  COPY_FROM_COMMUNITY_TO_LOGIN_SUCCESS: 'Kontodaten wurden erfolgreich vom Gemeinschafts-Server zum Login-Server kopiert!',
  DELETE_FROM_COMMUNITY: 'Benutzer Konto vom Gemeinschafts-Server löschen',
  DELETE_FROM_COMMUNITY_SUCCESS: 'Benutzer Konto vom Gemeinschafts-Server erfolgreich gelöscht',
  COPY_FAILED:  'Fehler beim Kopieren',
  DELETE_FAILED: 'Fehler beim löschen',
  AJAX_CRITICAL: 'Kritischer Fehler beim Ajax-Request',
  COPY_IN_PROGRESS: 'Wird kopiert',
  DELETE_IN_PROGRESS: 'Wird gelöscht',
  RECEIVE_TRANSACTIONS_COUNT: 'Erhaltene Transaktionen: ',
  SENDED_TRANSACTIONS_COUNT:  'gesendete Transaktionen: ',
  CREATION_TRANSACTIONS_COUNT: 'erhaltende Schöpfungs-Transaktionen: '
  
}


