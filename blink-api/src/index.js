import express from "express";
import cors from "cors";


const app = express()

app.use(cors())
app.use(express.json())

const links = new Map()

app.post("/short-it", (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const slug = Math.random().toString(36).substring(2, 8);
    links.set(slug, url);

    res.json({
        shortUrl: `http://localhost:3000/${slug}`,
    });
})

app.get("/:slug", (req, res) => {
  const url = links.get(req.params.slug);

  if (!url) {
    return res.status(404).json({ error: "Not found" });
  }

  res.redirect(url);
});

app.listen(3000, () => {
  console.log("rodando em http://localhost:3000");
});