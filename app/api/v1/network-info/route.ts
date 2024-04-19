import os from "os"

app.get("/", (req, res) => {
  const networkInterfaces = os.networkInterfaces();

  res.json({
    networkInterfaces,
  });
});