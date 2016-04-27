import { DB } from '../config/globals';

class Subscription {
    constructor() {
        
    }
    
    create(req, res) {
        //this will also have a plans property will be updated via another controller
        let subscription = {
            title: req.body.title,
            description: req.body.description,
            subscriptionItem: req.body.subscriptionItem
        };
                
        let query = 'MATCH (a:Account {shop: {shop}})' +
                    'CREATE a-[r:CREATED_A {createdOn: timestamp()}]->(s:Subscription {subscription})' +
                    'RETURN s';
        
        DB.query(query, { shop: req.body.shop, subscription }, function(err, result) {
            if (!err && result.length > 0) {
                return res.status(200).send(result[0]); //give 200 OK response with the result of the added subscription
            } else {
                console.log('There was an error creating the subscription:', err);
                return res.sendStatus(500);
            }
        });
    }
    
    read(req, res) {
        let query = 'MATCH (a:Account {shop: {shop}})-[r:CREATED_A]->(s:Subscription)' +
                    'OPTIONAL MATCH (s)-[:HAS_PROPERTY]->(p:Property) ' +
                    'OPTIONAL MATCH (s)-[:HAS_PLAN]->(plan:Plan)-->(t:Term) ' +
                    'WITH {price: plan.price, subtitle: plan.subtitle, description: plan.description, title: plan.title, priceLabel: plan.priceLabel, id: ID(plan), termName: t.name, termInterval: t.interval} as planTerm ORDER BY planTerm.termInterval, s, p ' +
                    'RETURN s.title as title, s.description as description, s.subscriptionItem as subscriptionItem, p as properties, collect(planTerm) as plans';
        
        DB.query(query, { shop: req.query.shop }, function(err, result) {
            if (!err) {
                return res.status(200).send(result); //give 200 OK response with the result of the subscriptions
            } else {
                console.log('There was an error retrieving the subscriptions:', err);
                return res.sendStatus(500);
            }
        });
    }
    
    update(req, res) {
        let set = ' SET ';
        let property = '';
    
        if (req.body.title) {
            let comma = (req.body.description || typeof req.body.subscriptionItem !== 'undefined') ? ',' : '';
            set += `s.title = {title}${comma} `;
        }

        if (req.body.description) {
            let comma = (typeof req.body.subscriptionItem !== 'undefined') ? ',' : '';
            set += `s.description = {description}${comma} `;
        }
        
        if (typeof req.body.subscriptionItem !== 'undefined') {
            set += 's.subscriptionItem = {subscriptionItem} ';
        }

        if (req.body.properties) {
            //the property node won't exist the first time this field is updated so need to create it
            //if it exists though, we don't want to create a new one and the properties may change from request to request
            property += 'WITH s MERGE (s)-[:HAS_PROPERTY]->(p:Property)';
            property += 'ON CREATE SET p = {properties}';
            property += 'ON MATCH SET p = {properties}';
        }

        let query = 'MATCH (a:Account {shop: {shop}})-[r:CREATED_A]->(s:Subscription)' +
                    'WHERE ID(s) = {id}' +
                    set +
                    property +
                    'RETURN s';
        
        DB.query(query, { 
            shop: req.body.shop,
            title: req.body.title,
            description: req.body.description,
            properties: req.body.properties,
            subscriptionItem: req.body.subscriptionItem,
            id: Number(req.params.id)
        }, function(err, result) {
            if (!err && result.length > 0) {
                return res.status(200).send(result); //give 200 OK response with the result of the subscription updated
            } else {
                console.log('There was an error updating the subscription:', err);
                return res.sendStatus(500);
            }
        });
    }
    
    delete(req, res) {
        //delete the plans for the subscription and the subscription and all relationship to and from those nodes
        let query = 'MATCH (a:Account {shop: {shop}})-[r:CREATED_A]->(s:Subscription)' +
                    'WHERE ID(s) = {id}' +
                    'OPTIONAL MATCH (s)-[planRel:HAS_PLAN]->(p:Plan) ' +
                    'OPTIONAL MATCH (s)-[propRel:HAS_PROPERTY]->(prop:Property) ' +
                    'DELETE planRel, propRel, r, s, p, prop';
        
        DB.query(query, { shop: req.body.shop, id: Number(req.params.id) }, function(err) {
            if (!err) {
                return res.sendStatus(200); //give 200 OK response
            } else {
                console.log('There was an error deleting the subscriptions and plans:', err);
                return res.sendStatus(500);
            }
        });
    }
}

export default Subscription;
