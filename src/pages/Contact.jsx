import image1 from '../imges/images.png'
function Contact() {
    return(
        <div className='container mt-4'>
            <div class="row">
            <div class="col-lg-6">
                <div class="page-content">
                    <p>Need to get in touch? No problem! You can use our contact form to send us a message.</p>
                    <div class="support-license">
                        <ul>
                            <li>Need a support? Check our available <a href="https://bootstrapmade.com/members/support/">support options</a></li>
                            <li>Want to remove the back links to BootstrapMade? Check our available <a href="https://bootstrapmade.com/license/">licensing options</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <form class="contact-form php-email-form mb-4" role="form" action="https://bootstrapmade.com/contact/submit/" method="POST" data-recaptcha-site-key="6LemuFwkAAAAANL4HyqwdRkbf9qwovHeRoEQZ9VH">
                    <div class="row"><div class="form-group d-none">
                        <input type="text" class="form-control" name="first_name" value="" />
                    </div>
                        <div class="form-group col-md-6">
                            <input type="name" name="name" class="form-control" id="contact-name" placeholder="Your Name" required="" />
                        </div>
                        <div class="form-group col-md-6" >
                            <input type="email" name="email" class="form-control" id="contact-email" placeholder="Your Email" required="" />
                        </div>
                    </div>
                    <div class="row"><div class="form-group col-md-12">
                        <input type="text" name="subject" class="form-control" id="contact-subject" placeholder="Subject" required="" />
                    </div>
                        <div class="form-group col-md-12">
                            <textarea class="form-control" name="message" id="contact-message" placeholder="Your Message" rows="10" required="">
                            </textarea>
                        </div>
                        <div class="col-md-12">
                            <label class="form-group custom-checkbox float-left">I've read and accept the <a href="https://bootstrapmade.com/privacy/">privacy policy</a>.
                                <input type="checkbox" class="form-control" name="privacy-policy" value="accept"/>
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="col-md-12">
                            <div class="loading">
                            </div>
                            <div class="error-message">
                            </div>
                            <div class="sent-message">Your message has been sent. Thank you!
                            </div>
                        </div>
                        <div class="form-send col-md-12">
                            <button type="submit" class="btn btn-large">Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}
export default Contact;