import React from 'react';
import ModernNavbar from '@/components/ModernNavbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  // Set document title and meta tags
  React.useEffect(() => {
    document.title = "Privacy Policy - BillBox";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for BillBox - Learn how we collect, use, and protect your personal data when you use our digital billing and business management platform.');
    }
  }, []);

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900">
        <ModernNavbar />
        
        <div className="container mx-auto max-w-4xl py-12 px-6">
          <div className="bg-white/95 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/20">
            
            <header className="border-b pb-6 mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500 mt-2">for BillBox</p>
              <p className="text-sm text-gray-500 mt-4"><strong>Effective Date:</strong> September 3, 2025</p>
            </header>
            
            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-gray-800">
                Welcome to <strong>BillBox</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our services, and tell you about your privacy rights and how the law protects you.
              </p>

              {/* Section: What Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">1. What Information We Collect</h2>
                <p className="mb-4 text-gray-800">
                  We collect information to provide and improve our services to you. The types of information we collect include:
                </p>
                <ul className="list-disc list-inside space-y-3 pl-2 text-gray-800">
                  <li>
                    <strong>Personal information you provide:</strong> When you create an account, register your business, or contact us, we may collect information such as your name, email address, phone number, business details, and other information you choose to provide.
                  </li>
                  <li>
                    <strong>Information collected automatically:</strong> 
                    When you use our services, we may automatically collect certain information about your device and usage. This includes your IP address, browser type, operating system, pages visited, and the dates/times of your visits.
                  </li>
                  <li>
                    <strong>Information from third parties (including Meta):</strong> 
                    If you connect to our service using a third-party like Meta (Facebook), we may receive information from them as permitted by your privacy settings on that service. This could include your public profile information and email address.
                  </li>
                </ul>
              </section>

              {/* Section: How and Why We Use Your Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">2. How and Why We Use Your Information</h2>
                <p className="mb-4 text-gray-800">
                  We use the information we collect for various purposes, clearly aimed at providing and enhancing your experience:
                </p>
                <ul className="list-disc list-inside space-y-3 pl-2 text-gray-800">
                  <li><strong>To provide our service:</strong> To create and manage your account, provide customer support, and operate our platform effectively.</li>
                  <li><strong>To improve our service:</strong> To understand how users interact with our service so we can enhance functionality and user experience.</li>
                  <li><strong>For communication:</strong> To send you service-related announcements, important updates, and promotional emails. You can opt-out of promotional communications at any time.</li>
                  <li><strong>For security:</strong> To protect against fraud, abuse, and to ensure the security and integrity of our platform.</li>
                </ul>
              </section>

              {/* Section: Data Deletion */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">3. How to Request Data Deletion</h2>
                <p className="mb-4 text-gray-800">
                  You have the right to request the deletion of your personal data. You can initiate this process in the following ways:
                </p>
                <ul className="list-disc list-inside space-y-3 pl-2 text-gray-800">
                  <li>
                    <strong>By Email:</strong> Please send an email to our support team at <a href="mailto:billbox0302@gmail.com" className="text-indigo-600 hover:underline font-medium">billbox0302@gmail.com</a> with the subject line "Data Deletion Request". Please include your username to help us identify your account.
                  </li>
                  <li>
                    <strong>Through our Contact Form:</strong> You can also submit a request through our contact form available on our website.
                  </li>
                </ul>
                <p className="mt-4 text-sm bg-gray-100 p-4 rounded-lg text-gray-800">
                  We will process your request within a reasonable timeframe and in accordance with applicable laws. Please note that we may need to retain certain information for legal or legitimate business purposes, such as record-keeping.
                </p>
              </section>

              {/* Section: Changes to This Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">4. Changes to This Privacy Policy</h2>
                <p className="text-gray-800">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Effective Date" at the top. We encourage you to review this page periodically for any changes.
                </p>
              </section>

              {/* Section: Contact Us */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">5. Contact Us</h2>
                <p className="text-gray-800">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2 text-gray-800">
                  <strong>Email:</strong> <a href="mailto:billbox0302@gmail.com" className="text-indigo-600 hover:underline font-medium">billbox0302@gmail.com</a><br />
                  <strong>Website:</strong> <a href="https://www.billbox.co.in" className="text-indigo-600 hover:underline font-medium">www.billbox.co.in</a>
                </p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
