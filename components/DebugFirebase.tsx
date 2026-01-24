import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

const DebugFirebase: React.FC = () => {
  const [config, setConfig] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sdkVersion, setSdkVersion] = useState<string>('');
  const [restApiTest, setRestApiTest] = useState<any>(null);

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        // Get Firebase SDK version
        try {
          // @ts-ignore - Firebase version is available
          const version = (auth.app as any).SDK_VERSION;
          setSdkVersion(version || 'Unknown');
        } catch {
          setSdkVersion('Unknown');
        }
        
        // Try to get the current user to test auth initialization
        const currentUser = auth.currentUser;
        
        // Get app configuration from auth
        const app = auth.app;
        const config = {
          apiKey: app.options.apiKey,
          authDomain: app.options.authDomain,
          projectId: app.options.projectId,
          storageBucket: app.options.storageBucket,
          messagingSenderId: app.options.messagingSenderId,
          appId: app.options.appId
        };

        setConfig(config);
        setError(null);
        
        // Test REST API
        await testRestApi(config.apiKey);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        console.error('Firebase debug error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkFirebase();
  }, []);

  const testRestApi = async (apiKey: string) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: `test${Date.now()}@example.com`,
            password: 'password123',
            returnSecureToken: true
          })
        }
      );
      
      const data = await response.json();
      setRestApiTest({
        success: !data.error,
        error: data.error,
        message: data.error ? 'REST API failed' : 'REST API working'
      });
    } catch (err: any) {
      setRestApiTest({
        success: false,
        error: err.message,
        message: 'REST API test failed'
      });
    }
  };

  if (loading) {
    return <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">Loading Firebase debug info...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl max-w-2xl mx-auto my-8">
      <h2 className="text-xl font-bold text-white mb-4">Firebase Configuration Debug</h2>
      
      {error ? (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error</h3>
          <p className="text-red-300">{error}</p>
        </div>
      ) : null}
      
      {config ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Firebase Initialized Successfully</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-400">SDK Version:</div>
                <div className="text-gray-300">{sdkVersion}</div>
                
                <div className="text-gray-400">API Key:</div>
                <div className="text-gray-300 font-mono text-sm truncate">{config.apiKey}</div>
                
                <div className="text-gray-400">Auth Domain:</div>
                <div className="text-gray-300">{config.authDomain}</div>
                
                <div className="text-gray-400">Project ID:</div>
                <div className="text-gray-300">{config.projectId}</div>
                
                <div className="text-gray-400">Storage Bucket:</div>
                <div className="text-gray-300">{config.storageBucket}</div>
                
                <div className="text-gray-400">Messaging Sender ID:</div>
                <div className="text-gray-300">{config.messagingSenderId}</div>
                
                <div className="text-gray-400">App ID:</div>
                <div className="text-gray-300">{config.appId}</div>
              </div>
            </div>
          </div>
          
          {restApiTest && (
            <div className={`p-4 ${restApiTest.success ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'} border rounded-lg`}>
              <h3 className={`text-lg font-semibold ${restApiTest.success ? 'text-green-400' : 'text-red-400'} mb-2`}>
                REST API Test: {restApiTest.message}
              </h3>
              {restApiTest.error && (
                <div className="mt-2 p-2 bg-black/30 rounded">
                  <div className="text-sm text-gray-300">Error: {JSON.stringify(restApiTest.error)}</div>
                </div>
              )}
            </div>
          )}
          
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Environment Variables Check</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-400">VITE_FIREBASE_API_KEY:</div>
                <div className="text-gray-300">
                  {import.meta.env.VITE_FIREBASE_API_KEY 
                    ? `${import.meta.env.VITE_FIREBASE_API_KEY.substring(0, 10)}...` 
                    : 'NOT SET'}
                </div>
                
                <div className="text-gray-400">VITE_FIREBASE_PROJECT_ID:</div>
                <div className="text-gray-300">
                  {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'NOT SET'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Next Steps</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-400">
          <li>Check browser console for any Firebase errors</li>
          <li>Verify API key restrictions in Firebase Console</li>
          <li>Ensure Authentication is enabled in Firebase Console</li>
          <li>Check that the Firebase project exists and is active</li>
        </ul>
      </div>
    </div>
  );
};

export default DebugFirebase;