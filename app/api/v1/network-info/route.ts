import os from "os";

export async function GET(req: Request, res: Response) {
  const networkInterfaces = os.networkInterfaces();

  return new Response(JSON.stringify(networkInterfaces), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
