import OAuth from '../controllers/OAuth';
import Subscription from '../controllers/Subscription';
import Plan from '../controllers/Plan';

class Routes {
    
    constructor(app) {
        let OAuthController = new OAuth();
        
        app.get('/', OAuthController.landing);
        app.get('/oauth', OAuthController.redirectUri);
        app.post('/uninstall', OAuthController.uninstall);
        
        //subscription routes
        let SubscriptionController = new Subscription();
        
        app.post('/subscriptions', SubscriptionController.create);
        app.get('/subscriptions', SubscriptionController.read);
        app.put('/subscriptions/:id', SubscriptionController.update);
        app.delete('/subscriptions/:id', SubscriptionController.delete);
        
        //plan routes
        let PlanController = new Plan();
        
        app.post('/subscriptions/:id/plans', PlanController.create);
        app.put('/subscriptions/:subscriptionId/plans/:id', PlanController.update);
        app.delete('/subscriptions/:subscriptionId/plans/:id', PlanController.delete);
    }
    
}

export default Routes;
