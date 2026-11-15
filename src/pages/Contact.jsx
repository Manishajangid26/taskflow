import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import './home.css';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Product Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'Product Inquiry', message: '' });
  };

  return (
    <div className="taskflow-home">
      <PublicNavbar />

      <section className="contact-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">GET IN TOUCH</span>
            <h2 className="fw-bold">We’d Love to Hear From You</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '540px' }}>
              Have a question about TaskFlow features, team onboarding, or custom workflows? Send us a message anytime.
            </p>
          </div>

          <div className="row g-4 align-items-stretch">
            {/* Left Contact Info */}
            <div className="col-lg-5 d-flex flex-column gap-3">
              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email Support</h6>
                  <p className="text-muted small mb-0">support@taskflow.io</p>
                  <small className="text-primary">Replies within 2 hours</small>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Phone & WhatsApp</h6>
                  <p className="text-muted small mb-0">+91 98765 43210</p>
                  <small className="text-muted">Mon – Sat, 9:00 AM to 6:00 PM IST</small>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Headquarters</h6>
                  <p className="text-muted small mb-0">
                    Malviya Nagar, Jaipur, Rajasthan, India
                  </p>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <motion.div
              className="col-lg-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="contact-card h-100">
                {submitted ? (
                  <div className="text-center py-5">
                    <CheckCircle2 size={48} className="text-success mb-3" />
                    <h4 className="fw-bold">Message Sent Successfully!</h4>
                    <p className="text-muted mb-4">
                      Thank you for reaching out to TaskFlow. Our team will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn btn-outline-primary rounded-3 px-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Your Name</label>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          placeholder="Manisha Jangir"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Email Address</label>
                        <input
                          type="email"
                          className="form-control rounded-3"
                          placeholder="manisha@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Topic</label>
                      <select
                        className="form-select rounded-3"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option>Product Inquiry</option>
                        <option>Team & Enterprise Setup</option>
                        <option>Technical Support</option>
                        <option>Feedback & Suggestions</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-semibold">Message</label>
                      <textarea
                        rows="4"
                        className="form-control rounded-3"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary hero-btn w-100 justify-content-center">
                      <Send size={17} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="taskflow-footer">
        <div className="container text-center">
          <h3>TaskFlow<span>.</span></h3>
          <p>Plan Better. Work Smarter. Achieve More.</p>
          <small>© 2026 TaskFlow. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default Contact;