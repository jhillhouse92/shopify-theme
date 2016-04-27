import seraph from 'seraph';
import UUID from 'node-uuid';

export const GLOBALS = {
    baseURL: 'https://subscriptionsforshopify.herokuapp.com',
    apiKey: '106475b258522723dfd0229de3d7f7fe',
    secret: 'c264f69666a6f817f6ac605e2553d8ff',
    scope: 'read_customers,write_customers'
};

//this is not a constant
export let CONFIG = {
    shopify_api_key: GLOBALS.apiKey, // Your API key
    shopify_shared_secret: GLOBALS.secret, // Your Shared Secret
    shopify_scope: GLOBALS.scope,
    redirect_uri: GLOBALS.baseURL + '/oauth',
    nonce: UUID.v1() // you must provide a randomly selected value unique for each authorization request
};

export const DB = seraph({ server: 'https://neo-leora-daniel-firebrick.digital-ocean.graphstory.com:7473',
                    user: 'neo_leora_daniel_firebrick',
                    pass: 'wCSvYmFh9jtLnChLM4eSpKPgnS8IFBTdYwEdWcPD' });
