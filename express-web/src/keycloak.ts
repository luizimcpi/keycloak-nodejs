import KeycloakConnect from "keycloak-connect";
import session from "express-session";

KeycloakConnect.prototype.accessDenied = (req, res) => {
    res.json({message: 'Não Autorizado'});
}

export const memoryStore = new session.MemoryStore();

const config: KeycloakConnect.KeycloakConfig = {
    realm: 'my-test-realm',
    "auth-server-url": 'http://localhost:8080/',
    resource: 'my-webapp-client',
    "confidential-port": 0,
    "ssl-required": "external"
}

const keycloak = new KeycloakConnect({store: memoryStore}, config);

export default keycloak;