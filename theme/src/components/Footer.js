import React, { Component } from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
    }
    
    signUp() {
        /*
        var removeNewsletterAlert = function($form){
            window.setTimeout(function(){
              $form.find('.alert').hide(186, function(){
                this.remove();
              });
            }, 6000);
        };

        var resetNewsletterForm = function($form){
            $form.find('[type="submit"]').prop('disabled', false);
            $form.find('#fieldEmail').val('');
            removeNewsletterAlert($form);
        };

        $(document).on('submit', '.newsletter-form > form', function(e){
            var $form = $(this);
            e.preventDefault();
            $form.find('[type="submit"]').prop('disabled', true);
            if($form.find('#fieldEmail').val() !== ''){
                $.ajax({
                    type: 'POST',
                    dataType: 'json', 
                    url: $form.prop('action'),
                    data: $form.serialize()
                })
                .done(function(result){
                    $form.prepend('<div class="alert alert-success">Thank you for subscribing to our email newsletter.</div>');
                    resetNewsletterForm($form);
                })
                .fail(function(err){
                    console.log('err: ', err);
                    $form.prepend('<div class="alert alert-danger">There was an error subscribing to our email newsletter.</div>');
                    resetNewsletterForm($form);
                });
            }
        });
        */
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="footer__grid col-sm-3">
                        <h4>Shop</h4>
                        <ul className="list-nav nav">
                            <li><a href="/pages/quiz" title="Subscribe">Subscribe</a></li>
                            <li><a href="/pages/gift-subscription-to-friend" title="Gift">Gift</a></li>
                            <li><a href="/pages/shop" title="Store">Store</a></li>
                        </ul>
                        <div className="clearfix social-icons">
                            <div className="social-blurb">Let's Be Friends</div>
                            <a href="https://twitter.com/VaVaVooOfficial" target="_blank"><img className="social-icon" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/twitter-icon.png?557292905641376507" /></a>
                            <a href="https://www.facebook.com/vavavooofficial" target="_blank"><img className="social-icon" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/facebook-icon.png?557292905641376507" /></a>
                            <a href="https://www.instagram.com/vavavoo/" target="_blank"><img className="social-icon" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/instagram-icon.png?557292905641376507" /></a>
                            <a href="http://vavettes.tumblr.com/" target="_blank"><img className="social-icon" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/tumblr-icon.png?557292905641376507" /></a>
                            <a href="https://vine.co/vavavoo/" target="_blank"><img className="social-icon" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/vine-icon.png?557292905641376507" /></a>
                            <a href="https://www.pinterest.com/VaVaVooOfficial/" target="_blank"><img className="social-icon" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/pinterest-icon.png?557292905641376507" /></a>
                            <a href="" target="_blank"><img className="social-icon" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/googleplus-icon.png?557292905641376507" /></a>
                        </div>
                    </div>
                    <div className="footer__grid col-sm-3">
                        <h4>Our Company</h4>
                        <ul className="list-nav nav">
                            <li><a href="/pages/about-vavavoo" title="About VaVaVoo">About VaVaVoo</a></li>
                            <li><a href="/pages/press" title="Press">Press</a></li>
                            <li><a href="/blogs/news" title="V3Blog">V3Blog</a></li>
                        </ul>
                    </div>
                    <div className="footer__grid col-sm-3">
                        <h4><div className="hidden-xs">Help</div></h4>
                        <ul className="list-nav nav">
                            <li><a href="/pages/received-a-gift" title="Received A Gift?">Received A Gift?</a></li>
                            <li><a href="/pages/how-it-works" title="How it Works">How it Works</a></li>
                            <li><a href="/pages/faq" title="FAQ">FAQ</a></li>
                            <li><a href="/pages/contact" title="Contact">Contact</a></li>
                            <li><a href="/pages/privacy-policy" title="Privacy">Privacy</a></li>
                            <li><a href="/pages/terms-and-conditions" title="Terms">Terms</a></li>
                        </ul>
                    </div>
                    <div className="footer__grid col-sm-3">
                        <h4>Gift VaVaVoo</h4>
                        <a className="gift-link" href="/pages/gift-subscription-to-friend">
                            <img classNames="hoverfx" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/vvv-footer__giftcard.png?17805697884005206113" />
                        </a>
                        <h5>SIGN UP FOR THE LATEST NEWS</h5>
                        <p>Get exclusive offers, sneak peeks, and insider tips delivered straight to your inbox.</p>
                        <div className="form-inline">
                            <div className="newsletter-form">
                                <form action="https://vavavoo.us1.list-manage.com/subscribe/post-json?u=83280adac6bd89afc15222bc4&amp;id=7ae5bf3c7c&amp;c=?" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate contact-form">
                                    <input type="hidden" id="contact_tags" name="contact[tags]" value="prospect,newsletter" />
                                    <div className="input-group">
                                        <input id="fieldEmail" name="EMAIL" className="form-control" type="email" placeholder="Your email" />
                                    </div>
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-signup">Submit</button>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-col">
                    <a className="go-to-top" href="#wrap">
                        <img src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/vvv-footer__back-to-top.png?557292905641376507" />
                    </a>
                    <div className="text-center footer-credits">
                        <small>
                            <a href="/" title="VaVaVoo homepage">2016 ©  VaVaVoo.</a>
                        </small>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Footer;
