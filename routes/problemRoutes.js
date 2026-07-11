const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");

//retrive all the problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug });
    if (!problem) {
      res.status(500).json({ message: "cant find that problem" });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/run", async (req, res) => {
  try {
    const response = await fetch("http://localhost:9000/2015-03-31/functions/function/invocations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    // Check if the runner itself returned an error
    if (!response.ok) {
        return res.status(response.status).json({ error: "Execution service error", details: data });
    }

    res.json({ output: data.body || data });
  } catch (err) {
    console.error("Runner connection error:", err);
    res.status(500).json({ error: "Could not connect to execution service" });
  }
});


module.exports = router;