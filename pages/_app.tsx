// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Mail, Trash2, Clock, Shield, Eye } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
}

const TempEmailGenerator: React.FC = () => {
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false);

  const domains = [
    '@tempmail.org',
    '@10minutemail.com',
    '@throwaway.email',
    '@guerrillamail.info',
    '@mailinator.com',
    '@temp-mail.org'
  ];

  const generateRandomEmail = (): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 8) + 6;
    let username = '';
    
    for (let i = 0; i < length; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return username + domain;
  };

  const createNewEmail = () => {
    const newEmail = generateRandomEmail();
    setCurrentEmail(newEmail);
    setEmails([]);
    setSelectedEmail(null);
    setTimeRemaining(600);
    setIsActive(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Email copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const deleteEmail = () => {
    setCurrentEmail('');
    setEmails([]);
    setSelectedEmail(null);
    setIsActive(false);
    setTimeRemaining(600);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate receiving emails
  const simulateIncomingEmail = () => {
    if (!isActive || !currentEmail) return;

    const sampleEmails = [
      {
        from: 'newsletter@example.com',
        subject: 'Welcome to our Newsletter!',
        body: 'Thank you for subscribing to our newsletter. Stay tuned for updates!'
      },
      {
        from: 'support@service.com',
        subject: 'Account Verification Required',
        body: 'Please verify your account by clicking the link below...'
      },
      {
        from: 'noreply@social.com',
        subject: 'New friend request',
        body: 'You have received a new friend request on our platform.'
      },
      {
        from: 'offers@store.com',
        subject: 'Special Discount - 50% OFF!',
        body: 'Limited time offer: Get 50% off on all items. Use code: TEMP50'
      }
    ];

    if (Math.random() < 0.3) { // 30% chance of receiving an email
      const randomEmail = sampleEmails[Math.floor(Math.random() * sampleEmails.length)];
      const newEmail: Email = {
        id: Date.now().toString(),
        from: randomEmail.from,
        subject: randomEmail.subject,
        body: randomEmail.body,
        timestamp: new Date(),
        isRead: false
      };
      setEmails(prev => [newEmail, ...prev]);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          setCurrentEmail('');
          setEmails([]);
          setSelectedEmail(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining]);

  // Simulate incoming emails
  useEffect(() => {
    if (!isActive) return;

    const emailTimer = setInterval(simulateIncomingEmail, 15000); // Check every 15 seconds
    return () => clearInterval(emailTimer);
  }, [isActive, currentEmail]);

  const markAsRead = (emailId: string) => {
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  const openEmail = (email: Email) => {
    setSelectedEmail(email);
    markAsRead(email.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-12 h-12 text-cyan-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">TempMail</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Disposable Temporary Email Generator - Keep your real inbox clean
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Email Generator Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Email Display */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                Your Temporary Email Address
              </h2>
              
              {currentEmail ? (
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 font-mono text-sm break-all">
                        {currentEmail}
                      </span>
                      <button
                        onClick={() => copyToClipboard(currentEmail)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {isActive && (
                      <div className="flex items-center text-orange-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Expires in: {formatTime(timeRemaining)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={createNewEmail}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate New
                    </button>
                    <button
                      onClick={deleteEmail}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-gray-900 p-8 rounded-lg border border-gray-600 mb-4">
                    <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No active email address</p>
                  </div>
                  <button
                    onClick={createNewEmail}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all font-semibold"
                  >
                    Generate Temporary Email
                  </button>
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                What is Disposable Temporary E-mail?
              </h3>
              <div className="text-gray-300 text-sm space-y-3">
                <p>
                  <strong>Disposable email</strong> - is a free email service that allows to receive email at a temporary address that self-destructed after a certain time elapses.
                </p>
                <p>
                  It is also known by names like: tempmail, 10minutemail, 10minmail, throwaway email, fake-mail, fake email generator, burner mail or trash-mail.
                </p>
                <p>
                  Many forums, Wi-Fi owners, websites and blogs ask visitors to register before they can view content, post comments or download something. Temp-Mail is most advanced throwaway email service that helps you avoid spam and stay safe.
                </p>
              </div>
              
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Secure • Anonymous • Free
              </div>
            </div>
          </div>

          {/* Inbox Panel */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-gray-700 h-[600px] flex flex-col">
              {/* Inbox Header */}
              <div className="bg-gray-900 p-4 rounded-t-xl border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Inbox ({emails.length})
                  </h3>
                  <div className="text-sm text-gray-400">
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>

              {/* Email List or Email View */}
              <div className="flex-1 overflow-hidden">
                {selectedEmail ? (
                  /* Email View */
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                      <button
                        onClick={() => setSelectedEmail(null)}
                        className="text-cyan-400 hover:text-cyan-300 text-sm mb-3"
                      >
                        ← Back to Inbox
                      </button>
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {selectedEmail.subject}
                      </h4>
                      <div className="text-gray-400 text-sm">
                        From: {selectedEmail.from}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {selectedEmail.timestamp.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="text-gray-300 whitespace-pre-wrap">
                        {selectedEmail.body}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Email List */
                  <div className="h-full overflow-y-auto">
                    {emails.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center">
                        <div>
                          <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400 text-lg mb-2">Your inbox is empty</p>
                          <p className="text-gray-500 text-sm">
                            {currentEmail ? 'Waiting for incoming emails...' : 'Generate an email address to start receiving emails'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-700">
                        {emails.map((email) => (
                          <div
                            key={email.id}
                            onClick={() => openEmail(email)}
                            className={`p-4 hover:bg-gray-700 cursor-pointer transition-colors ${
                              !email.isRead ? 'bg-gray-750' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-3 ${
                                  !email.isRead ? 'bg-blue-500' : 'bg-transparent'
                                }`} />
                                <span className={`font-medium ${
                                  !email.isRead ? 'text-white' : 'text-gray-300'
                                }`}>
                                  {email.from}
                                </span>
                              </div>
                              <span className="text-gray-500 text-xs">
                                {email.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <h4 className={`font-medium mb-1 ${
                              !email.isRead ? 'text-white' : 'text-gray-300'
                            }`}>
                              {email.subject}
                            </h4>
                            <p className="text-gray-500 text-sm truncate">
                              {email.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempEmailGenerator;