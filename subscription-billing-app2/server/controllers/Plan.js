import { DB } from '../config/globals';

class Plan {
    constructor() {
        
    }
    
    create(req, res) {
        //this will also have a plans property will be updated via another controller
        let plan = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            price: req.body.price,
            priceLabel: req.body.priceLabel
        };
        
        //term is an ENUM: month, 3_month, 6_month, 12_month
        let query = 'MATCH (t:Term {name: {term}}) WITH t ' +
                    'MATCH (a:Account {shop: {shop}})-[r:CREATED_A]->(s:Subscription) WITH s,t WHERE ID(s) = {id} ' +
                    'CREATE s-[:HAS_PLAN {createdOn: timestamp()}]->(p:Plan {plan})-[:WITH_A_TERM_OF]->(t) ' +
                    'RETURN p';
        
        DB.query(query, { term: req.body.term, shop: req.body.shop, id: Number(req.params.id), plan }, function(err, result) {
            if (!err && result.length > 0) {
                return res.status(200).send(result[0]); //give 200 OK response with the result of the added plan
            } else {
                console.log('There was an error creating the plan:', err);
                return res.sendStatus(500);
            }
        });
    }
    
    update(req, res) {
        let set = ' SET ';
    
        if (req.body.title) {
            let comma = (req.body.subtitle || req.body.description || typeof req.body.price !== 'undefined' || req.body.priceLabel) ? ',' : '';
            set += `p.title = {title}${comma} `;
        }

        if (req.body.subtitle) {
            let comma = (req.body.description || typeof req.body.price !== 'undefined' || req.body.priceLabel) ? ',' : '';
            set += `p.subtitle = {subtitle}${comma} `;
        }
        
        if (req.body.description) {
            let comma = (typeof req.body.price !== 'undefined' || req.body.priceLabel) ? ',' : '';
            set += `p.description = {description}${comma} `;
        }
        
        if (req.body.price) {
            let comma = (req.body.priceLabel) ? ',' : '';
            set += `p.price = {price}${comma} `;
        }
        
        if (req.body.priceLabel) {
            set += 'p.priceLabel = {priceLabel} ';
        }
        
        let query = 'MATCH (a:Account {shop: {shop}})-->(s:Subscription)-->(p:Plan)' +
                    'WHERE ID(s) = {subscriptionId} AND ID(p) = {id}' +
                    set +
                    'RETURN p';
        
        DB.query(query, { 
            shop: req.body.shop,
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            price: Number(req.body.price),
            priceLabel: req.body.priceLabel,
            subscriptionId: Number(req.params.subscriptionId),
            id: Number(req.params.id)
        }, function(err, result) {
            if (!err && result.length > 0) {
                return res.status(200).send(result); //give 200 OK response with the result of the plan updated
            } else {
                console.log('There was an error updating the plan:', err);
                return res.sendStatus(500);
            }
        });
    }
    
    delete(req, res) {
        //delete the plan and the relationship that connects it to subscription
        let query = 'MATCH (a:Account {shop: {shop}})-->(s:Subscription)-->(p:Plan)' +
                    'WHERE ID(s) = {subscriptionId} AND ID(p) = {id}' +
                    'DETACH DELETE p';
        
        DB.query(query, { shop: req.body.shop, subscriptionId: Number(req.params.subscriptionId), id: Number(req.params.id) }, function(err) {
            if (!err) {
                return res.sendStatus(200); //give 200 OK response
            } else {
                console.log('There was an error deleting the plan:', err);
                return res.sendStatus(500);
            }
        });
    }
}

export default Plan;
