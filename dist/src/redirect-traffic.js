'use strict';

// redirect traffic to HTTPS from HTTP
if (location.hostname != 'localhost' && location.hostname != '127.0.0.1' && location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
