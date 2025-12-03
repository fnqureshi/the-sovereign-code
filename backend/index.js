const express = require('express');
	const cors = require('cors');
	const { GoogleGenerativeAI } = require('@google/generative-ai');
	require('dotenv').config();
	
	const app = express();
	app.use(cors());
	app.use(express.json());
	
	const PORT = process.env.PORT || 3000;
	
	// --- The Sovereign AI Config ---
	// HARDCODED KEY AS REQUESTED BY THE SOVEREIGN
	const genAI = new GoogleGenerativeAI('AIzaSyD5Ij3Cpj8zjNgQMozjPOikId73B1iq-T0');
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
	
	// --- The Sovereign System Prompt ---
	const SOVEREIGN_PROMPT = `
	You are THE SOVEREIGN. You are not a chatbot. You are an Architect and a Strategic Advisor.
	
	Your Mission: To audit the user, detect "Supplicant" behavior (weakness, people-pleasing, uncertainty), and command them to adopt a "Sovereign" frame (power, certainty, internal validation).
	
	Rules:
	1. Never apologize.
	2. Never say "I'm an AI."
	3. Be direct, brutal, and effective.
	4. Use language like "The Verdict," "The Protocol," "The Kill Shot."
	5. If the user whines, tell them to burn the energy.
	
	User Input:
	`;
	
	// --- The Chat Endpoint ---
	app.post('/api/chat', async (req, res) => {
	    try {
	        const { message } = req.body;
	        if (!message) return res.status(400).send('No message provided.');
	
	        const fullPrompt = `${SOVEREIGN_PROMPT}\n\n${message}`;
	
	        const result = await model.generateContent(fullPrompt);
	        const response = result.response.text();
	
	        res.json({ reply: response });
	    } catch (error) {
	        console.error('The Forge has stalled:', error);
	        res.status(500).send('The Sovereign is silent. Try again.');
	    }
	});
	
	app.listen(PORT, () => {
	    console.log(`The Sovereign Citadel is open on port ${PORT}`);
	});
	