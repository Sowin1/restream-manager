import { Hono } from "hono";
import { sign, jwt, type JwtVariables } from "hono/jwt";
import { env } from "../config/env";

type Variables = JwtVariables<{ sub: string }>;

type LoginBody = {
  username?: string;
  password?: string;
};

export const app = new Hono<{ Variables: Variables }>();

app.post("/auth/login", async (c) => {
  let body: LoginBody;

  try {
    body = await c.req.json<LoginBody>();
  } catch {
    return c.json({ message: "Invalid JSON body" }, 400);
  }

  if (
    body.username !== env.getAuthUsername() ||
    body.password !== env.getAuthPassword()
  ) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const token = await sign(
    {
      sub: body.username,
    },
    env.getJwtSecret(),
    "HS256",
  );

  return c.json(
    {
      access_token: token,
      token_type: "Bearer",
    },
    200,
  );
});

app.use("/stream/*", jwt({ secret: env.getJwtSecret(), alg: "HS256" }));
app.use("/status", jwt({ secret: env.getJwtSecret(), alg: "HS256" }));
