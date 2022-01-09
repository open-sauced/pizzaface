const fetch = require('node-fetch');
const authUrl = "https://api.twitter.com/oauth2/token?grant_type=client_credentials";
class TwitterClient {
    constructor({user_id,interval}){
        if(!user_id || typeof user_id !== 'string' || user_id.trim() == ''){
            throw Error("Parameter user_id must be a non-blank string!");
            return;
        }
        this.user_id = user_id;
        // Default to 5 min interval
        this.interval = interval || 5 * 1000;
        this.loop = null;
        this.token = null;
        this.retries = 0;
        this.init().then();
    }
    async init(){
        const api_key = process.env.TWITTER_API_KEY;
        const secret = process.env.TWITTER_API_SECRET;
        console.info('Requesting token');
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic '+Buffer.from(`${api_key}:${secret}`).toString('base64')
        };
        try {
            const {access_token} = await fetch(authUrl, {method:'POST',headers})
            .then(response => response.json());
            this.token = access_token;
            console.info(`Token Received (length = ${this.token.length})`)
            this.interval = setInterval(this.checkSpaces.bind(this), this.interval);
            this.checkSpaces();
        } catch(error) {
            console.error({error});
            return null;
        }
    }

    async checkSpaces(){
        const endpoint = "https://api.twitter.com/2/spaces/by/creator_ids"
            +`?user_ids=${this.user_id}`
            +`&expansions=creator_id`
            +`&space.fields=started_at,state,title,scheduled_start`
            +`&user.fields=url,username,profile_image_url`;
        const headers = {
            'Authorization': `Bearer ${this.token}`
        };
        try {
            console.info('Requesting spaces info');
            const data = await fetch(endpoint,{headers}).then(response => response.json());
            console.log(data);
            /* TODO: setup event emitter for bot? */
        } catch(error){
            console.error({error});
            return null;
        } 
    }
    cancel(){
        if(this.loop) clearInterval(this.loop);
    }
}
module.exports = TwitterClient;