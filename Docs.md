// ANCHOR - Docs and note for the project

//Middle ware :means: code that runs before your route handlers —
to process or modify the incoming request.

app.use(express.json()); -- {
if the incoming request has a JSON body, automatically parse it and put it into req.body.
}

app.use(express.urlencoded({ extended: true })); -- {
This handles form submissions — when HTML forms send data using the application/x-www-form-urlencoded format
}

//FRONTEND
npm install framer-motion lucide-react axios



Authentication ::----

started with route api/auth in app.js 
