'use client';
import styles from '@/app/page.module.css';
import btnStyles from '@/lib/Elements/DsComponents/DsButtons/dsButton.module.css';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconFactory from '@/lib/Elements/IconComponent';
import DsTextField from '@/lib/Elements/DsComponents/DsInputs/dsTextField';
import DsPasswordField from '@/lib/Elements/DsComponents/DsInputs/dsPasswordField';
import DsButton from '@/lib/Elements/DsComponents/DsButtons/dsButton';

function loginPage() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [redirectUrl, setRedirectUrl] = useState('http://localhost:3001');
  const [redirectUrl, setRedirectUrl] = useState('http://172.145.1.109:7008');
  const client = 'SalesOrder';

  useEffect(() => {
    const redirectParam = searchParams.get('redirect');
    if (redirectParam) {
      setRedirectUrl(redirectParam);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    const clientSecrets: Record<string, string> = {
      SalesOrder: 'NXtMVbPuQ8AQUhHn773kxMgIwqXAmTGv',
      SalesReturn: 'wY470Du3kF8r2A7PLrsddJupDf8XFpZW',
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', client);
    params.append('username', username);
    params.append('password', password);

    if (clientSecrets[client]) {
      params.append('client_secret', clientSecrets[client]);
    }

    try {
      const response = await fetch(
        'http://172.145.1.112:8081/realms/ERP_Project/protocol/openid-connect/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params,
        }
      );

      const data = await response.json();

      if (data.access_token) {
        // ✅ Pass token via redirect URL
        const finalRedirect = `${redirectUrl}?token=${data.access_token}`;

        // const finalRedirect = `${redirectUrl}`;
        window.location.href = finalRedirect;
      } else {
        alert(
          data.error_description ||
            'Login failed. Please check your credentials.'
        );
      }
    } catch (err) {
      alert('Error connecting to authentication server.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftcolumn}>
        <div className={styles.leftContent}>
          <IconFactory name="Ipca_Logo_Large" className={styles.logo} />
          <div className={styles.labelforaiPharma}>
            <span className={styles.ai}>ai</span>
            <span className={styles.pharma}>Pharma</span>
          </div>
          <label className={styles.PharmaReinvented}>
            Pharma Reinvented: Excellence Through AI-Integrated Operation
          </label>
        </div>
        <div className={styles.bottomdiv}>
          <label>Version: 1.0</label>
          <label>Released On: 24/09/2024</label>
        </div>
      </div>

      <div className={styles.rightcolumn}>
        <div className={styles.rightContent}>
          <label className={styles.labelforlogin}>Login</label>
          <label className={styles.label}>
            Enter your username and password
          </label>
          <div className={styles.mainDiv}>
            <DsTextField
              placeholder="Username"
              initialValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <DsPasswordField
              placeholder="Password"
              initialValue={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <div className={styles.logindiv}>
              <DsButton
                id="loginBtn"
                buttonColor="btnInfo"
                buttonSize="btnMedium"
                buttonViewStyle="btnContained"
                className={btnStyles.btnAutoWidth}
                label="Login"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className={styles.cornerDiv}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
            <span className={styles.poweredclass}>Powered by:</span>
            <div style={{ width: '1.2em', height: '1.2em' }}>
              <IconFactory name="datastackLogo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
