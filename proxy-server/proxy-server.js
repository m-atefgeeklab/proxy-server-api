const express = require("express");
const proxy = require("express-http-proxy");

const app = express();
app.use(express.json()); // Parse JSON request bodies

// Function to determine the target server (for now, just localhost:4000)
function getTargetServerBasedOnLoad() {
  return process.env.TARGET_SERVER || "http://localhost:4000";
}

// Handle POST requests to /api/data and proxy them to the target server
app.post("/api/data", proxy(getTargetServerBasedOnLoad, {
  proxyReqPathResolver: (req) => req.originalUrl, // Keep original URL path
  userResDecorator: (proxyRes, proxyResData) => {
    // Log the response from the backend server
    console.log("Backend response:", proxyResData.toString("utf8"));
    return proxyResData;
  },
  proxyErrorHandler: (err, res, next) => {
    console.error("Proxy error:", err); // Log proxy errors
    res.status(500).json({ error: "Proxying failed" });
  }
}));

// Start the reverse proxy server
app.listen(3000, () => {
  console.log("Reverse proxy server running on port 3000");
});
