const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

export class ConfigService {
    public async getMongoConfig() {
        try {
            const [accessUserNameResponse] = await client.accessSecretVersion({name:"projects/53029777667/secrets/mongo-user/versions/latest"});
            const userName = accessUserNameResponse.payload.data.toString('utf8');

            const [accessPasswordResponse] = await client.accessSecretVersion({name:"projects/53029777667/secrets/mongo-password/versions/latest"});
            const password = accessPasswordResponse.payload.data.toString('utf8');
            return {
                uri: `mongodb+srv://${userName}:${password}@cluster0.u6nzh.mongodb.net/sample_airbnb?retryWrites=true&w=majority`
            }
        } catch (error) {
            console.log(error);
        }
    }
}
