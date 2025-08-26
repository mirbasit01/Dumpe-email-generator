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
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <Mail style={{
              width: '48px',
              height: '48px',
              color: '#00d4ff',
              marginRight: '15px'
            }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>TempMail</h1>
          </div>
          <p style={{
            color: '#a0aec0',
            fontSize: '18px',
            margin: 0
          }}>
            Disposable Temporary Email Generator - Keep your real inbox clean
          </p>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
          gap: '30px'
        }}>
          {/* Email Generator Panel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            {/* Current Email Display */}
            <div style={{
              backgroundColor: '#2d3748',
              borderRadius: '12px',
              padding: '30px',
              border: '1px solid #4a5568'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '20px'
              }}>
                Your Temporary Email Address
              </h2>
              
              {currentEmail ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <div style={{
                    backgroundColor: '#1a202c',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #4a5568'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        color: '#00d4ff',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        wordBreak: 'break-all'
                      }}>
                        {currentEmail}
                      </span>
                      <button
                        onClick={() => copyToClipboard(currentEmail)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#a0aec0',
                          cursor: 'pointer',
                          padding: '5px'
                        }}
                      >
                        <Copy style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>
                    
                    {isActive && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#f6ad55',
                        fontSize: '14px'
                      }}>
                        <Clock style={{ width: '16px', height: '16px', marginRight: '5px' }} />
                        Expires in: {formatTime(timeRemaining)}
                      </div>
                    )}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <button
                      onClick={createNewEmail}
                      style={{
                        flex: 1,
                        backgroundColor: '#3182ce',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#2c5282'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
                    >
                      <RefreshCw style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                      Generate New
                    </button>
                    <button
                      onClick={deleteEmail}
                      style={{
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#c53030'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#e53e3e'}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    backgroundColor: '#1a202c',
                    padding: '40px',
                    borderRadius: '8px',
                    border: '1px solid #4a5568',
                    marginBottom: '20px'
                  }}>
                    <Mail style={{
                      width: '64px',
                      height: '64px',
                      color: '#4a5568',
                      margin: '0 auto 20px'
                    }} />
                    <p style={{
                      color: '#a0aec0',
                      margin: 0
                    }}>No active email address</p>
                  </div>
                  <button
                    onClick={createNewEmail}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #00d4ff, #3182ce)',
                      color: 'white',
                      padding: '15px 30px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    Generate Temporary Email
                  </button>
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div style={{
              backgroundColor: '#2d3748',
              borderRadius: '12px',
              padding: '30px',
              border: '1px solid #4a5568'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '20px'
              }}>
                What is Disposable Temporary E-mail?
              </h3>
              <div style={{
                color: '#a0aec0',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <p style={{ marginBottom: '15px' }}>
                  <strong>Disposable email</strong> - is a free email service that allows to receive email at a temporary address that self-destructed after a certain time elapses.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  It is also known by names like: tempmail, 10minutemail, 10minmail, throwaway email, fake-mail, fake email generator, burner mail or trash-mail.
                </p>
                <p style={{ marginBottom: '20px' }}>
                  Many forums, Wi-Fi owners, websites and blogs ask visitors to register before they can view content, post comments or download something. Temp-Mail is most advanced throwaway email service that helps you avoid spam and stay safe.
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#68d391',
                fontSize: '14px'
              }}>
                <Shield style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Secure • Anonymous • Free
              </div>
            </div>
          </div>

          {/* Inbox Panel */}
          <div>
            <div style={{
              backgroundColor: '#2d3748',
              borderRadius: '12px',
              border: '1px solid #4a5568',
              height: '600px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Inbox Header */}
              <div style={{
                backgroundColor: '#1a202c',
                padding: '20px',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                borderBottom: '1px solid #4a5568'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    margin: 0
                  }}>
                    <Mail style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Inbox ({emails.length})
                  </h3>
                  <div style={{
                    fontSize: '14px',
                    color: '#a0aec0'
                  }}>
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>

              {/* Email List or Email View */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                {selectedEmail ? (
                  /* Email View */
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      padding: '20px',
                      borderBottom: '1px solid #4a5568'
                    }}>
                      <button
                        onClick={() => setSelectedEmail(null)}
                        style={{
                          color: '#00d4ff',
                          fontSize: '14px',
                          marginBottom: '15px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        ← Back to Inbox
                      </button>
                      <h4 style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '18px',
                        marginBottom: '10px'
                      }}>
                        {selectedEmail.subject}
                      </h4>
                      <div style={{
                        color: '#a0aec0',
                        fontSize: '14px',
                        marginBottom: '5px'
                      }}>
                        From: {selectedEmail.from}
                      </div>
                      <div style={{
                        color: '#a0aec0',
                        fontSize: '14px'
                      }}>
                        {selectedEmail.timestamp.toLocaleString()}
                      </div>
                    </div>
                    <div style={{
                      flex: 1,
                      padding: '20px',
                      overflowY: 'auto'
                    }}>
                      <div style={{
                        color: '#a0aec0',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {selectedEmail.body}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Email List */
                  <div style={{ height: '100%', overflowY: 'auto' }}>
                    {emails.length === 0 ? (
                      <div style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}>
                        <div>
                          <Mail style={{
                            width: '64px',
                            height: '64px',
                            color: '#4a5568',
                            margin: '0 auto 20px'
                          }} />
                          <p style={{
                            color: '#a0aec0',
                            fontSize: '18px',
                            marginBottom: '10px'
                          }}>Your inbox is empty</p>
                          <p style={{
                            color: '#718096',
                            fontSize: '14px'
                          }}>
                            {currentEmail ? 'Waiting for incoming emails...' : 'Generate an email address to start receiving emails'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {emails.map((email, index) => (
                          <div
                            key={email.id}
                            onClick={() => openEmail(email)}
                            style={{
                              padding: '20px',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                              backgroundColor: !email.isRead ? '#374151' : 'transparent',
                              borderBottom: index < emails.length - 1 ? '1px solid #4a5568' : 'none'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#4a5568'}
                            onMouseOut={(e) => e.target.style.backgroundColor = !email.isRead ? '#374151' : 'transparent'}
                          >
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              marginBottom: '10px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  marginRight: '15px',
                                  backgroundColor: !email.isRead ? '#3182ce' : 'transparent'
                                }} />
                                <span style={{
                                  fontWeight: '500',
                                  color: !email.isRead ? 'white' : '#a0aec0'
                                }}>
                                  {email.from}
                                </span>
                              </div>
                              <span style={{
                                color: '#718096',
                                fontSize: '12px'
                              }}>
                                {email.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <h4 style={{
                              fontWeight: '500',
                              marginBottom: '5px',
                              color: !email.isRead ? 'white' : '#a0aec0'
                            }}>
                              {email.subject}
                            </h4>
                            <p style={{
                              color: '#718096',
                              fontSize: '14px',
                              margin: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
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