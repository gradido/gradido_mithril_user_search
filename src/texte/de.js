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

$state = 'email not activated';
$color = 'warning';

$state = 'no keys';
$color = 'warning';
 */

export default {
  ACCOUNT_STATES: {
    lines: [
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
      }
    },
    'account not on login-server': {
      title: 'Konto nicht auf Login-Server',
      color: 'danger',
      description: {
        title: 'Das Konto existiert nicht (mehr) auf dem Login-Server: ein Fehler oder es wurde nur teilweise gelöscht.',
        lines: ['-', '+', '+', '+', '/']
      }
    },
    'email activated': {
      title: 'Konto aktiviert',
      color: 'primary',
      description: {
        title: 'Das Konto wurde vom Benutzer aktiviert und Schlüssel erzeugt, aber noch nicht auf diesen Gemeinschafts-Server kopiert.',
        lines: ['+', '+', '+', '-', '-']
      }
    },
    'account copied to community': {
      title: 'Konto auf den Gemeinschafts-Server kopiert',
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
      }
    },
    'account multiple times on login-server': {
      title: 'Konto mehrfach vorhanden',
      color: 'danger',
      description: {
        title: 'Das Konto ist auf dem Login-Server mehrfach vorhanden, das sollte nicht sein, auf dem Login-Server muss ein Fehler passiert sein!!'
      }
    },
    'account not on community server': {
      title: 'Konto nicht auf Gemeinschafts-Server',
      color: 'secondary',
      description: {
        title: 'Das Konto wurde auf dem Login-Server angelegt, aber existiert noch nicht auf dem Gemeinschafts-Server!',
        lines: ['+', null, null, '-', '-']
      }
    },
    'no keys': {
      title: 'Keine Schlüssel generiert',
      color: 'warning',
      description: {
        title:'Das Konto wurde auf dem Login-Server angelegt, aber es wurden noch keine Schlüssel generiert!',
        line: ['+', '+', '-', '-', '-']
      }
    }
    
  } 
  
}