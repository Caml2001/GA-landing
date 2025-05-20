import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - we don't need them for this static site, but the route structure is maintained

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
