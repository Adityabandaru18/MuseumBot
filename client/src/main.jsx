import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react'
import { ClerkProvider } from '@clerk/clerk-react';
import { store } from './components/Redux/store.jsx'
import { Provider } from 'react-redux'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
			<Provider store={store}>
				<App />
			</Provider>
		</ClerkProvider>
	</React.StrictMode>
);