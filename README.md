# Dynamic Authenticator

### by Team 26

1. Install dependencies

   ```bash
   npm install
   ```

2. Input IP address in .env (should be kept in root directory)

   ```
   BACKEND_URL=<IP_ADDRESS_HERE>:5000
   ```

3. Setting up backend
   - Make sure genai.py is in the server directory
   - You will need gcloud CLI installed and be properly logged in with google account

   ```bash
   gcloud init
   gcloud auth application-default login
   ```

4. Start the backend server
   
   ```bash
   cd server
   python server.py
   ```

5. IN A SEPERATE TERMINAL: Start the app in the root directory

   ```bash
    npx expo start
   ```
