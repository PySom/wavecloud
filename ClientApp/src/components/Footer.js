import React from 'react'

export default function Footer() {
    return (
        <>
        <div className="footer-up py-5 ">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="d-flex">
                            <div>
                            <img classname="footer-mail" src="images/mail.png"/>
                            </div>
                          
                            <div className="pad-up">
                                <h4 className="bigger">EMAIL SUPPORT</h4>
                                <p className="smaller">wavcloud.com</p> 
                            </div>
                           
                        </div>  
                        
                    </div>
                    <div className="col-md-4">
                        <div className="d-inline middle">
                            <div>
                             <h4 className="bigger">NEW TO WAVCLOUD?</h4>
                             <p className="smaller">Subscribe to our news letter to get latest updates</p> 
                            </div>
                          
                            <div className="pad-it">
                            <input className="email-it" type="email" name="email" placeholder="Enter Email Address" required=""/>
                               
                            </div>
                           
                        </div>  
                        
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex side-right">
                            <div>
                            <img className="wave-image" src="images/icon.svg"/>
                            </div>
                          
                            <div className="pad-up">
                                <h4 className="bigger">DOWNLOAD WAVCLOUD APP</h4>
                                <p className="smaller">Get access to exclusive offers</p> 
                                <div className="d-flex google-up">
                                    <img src="images/appstore.svg"/>
                                    <img src="images/playstore.svg"/>
                                </div>
                            </div>
                           
                        </div>  
                        
                    </div>
                
                </div>
         
            </div>
         
        </div>
        <footer class="footer-emp-w3ls py-5">
            <div class="container py-xl-5 py-lg-3">
                <div class="row footer-top">
                    <div class="col-lg-3 footer-grid-wthree">
                        <h1 class="footer-title text-white mb-4">LET US HELP YOU</h1>
                        <div class="contact-info">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                It has survived not only five centuries, but also the leap into electronic
                            </p>
                        </div>
                        <div>
                        <h1 class="footer-title text-white mb-4 follower">FOLLOW US ON</h1>
                        <div className="d-flex">
                            <img className="pad-right" src="images/facebook.svg"/>
                            <img className="pad-right" src="images/googleplus.svg"/>
                            <img className="pad-right" src="images/twitter.svg"/>
                            <img className="pad-right" src="images/instagram.svg"/>
                            <img className="pad-right" src="images/youtube.svg"/>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-3 footer-grid-wthree">
                        <h1 class="footer-title text-white mb-4">ABOUT WAVCLOUD</h1>
                        <div class="contact-info">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                It has survived not only five centuries, but also the leap into electronic
                            </p>
                        </div>
                        <div>
                        <h1 class="footer-title text-white mb-4 follower">CONTACT US ON</h1>
                        <div className="d-flex">
                           <p className="number">08112513333</p>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-3 footer-grid-wthree">
                        <h1 class="footer-title text-white mb-4">BUYING ON WAVCLOUD</h1>
                        <div class="contact-info">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                It has survived not only five centuries, but also the leap into electronic
                            </p>
                        </div>
                        <h1 class="footer-title text-white mb-4 follower">PAYMENT METHODS</h1>
                    </div>
                    <div class="col-lg-3 footer-grid-wthree">
                        <h1 class="footer-title text-white mb-4">WAVCLOUD INTERNATIONAL</h1>
                        <div class="contact-info">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                It has survived not only five centuries, but also the leap into electronic
                            </p>
                        </div>
                    </div>
                
                </div>
            </div>

            <div className="text-center">
                <p className="copyright">2020 Wavcloud. All Rights Reserved </p>
            </div>
        </footer>
    
        </>
    )
}
