import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotographerSchema, insertPhotoSchema, insertCategorySchema, insertExhibitionSchema, insertEventSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Photographers endpoints
  app.get('/api/photographers', async (req, res) => {
    const photographers = await storage.getAllPhotographers();
    res.json(photographers);
  });

  app.get('/api/photographers/featured', async (req, res) => {
    const photographers = await storage.getFeaturedPhotographers();
    res.json(photographers);
  });

  app.get('/api/photographers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const photographer = await storage.getPhotographer(id);
    if (!photographer) {
      return res.status(404).json({ message: 'Photographer not found' });
    }
    
    res.json(photographer);
  });

  app.post('/api/photographers', async (req, res) => {
    try {
      const data = insertPhotographerSchema.parse(req.body);
      const photographer = await storage.createPhotographer(data);
      res.status(201).json(photographer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  });

  // Categories endpoints
  app.get('/api/categories', async (req, res) => {
    const categories = await storage.getAllCategories();
    res.json(categories);
  });

  app.get('/api/categories/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const category = await storage.getCategory(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  });

  app.post('/api/categories', async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  });

  // Photos endpoints
  app.get('/api/photos', async (req, res) => {
    const photos = await storage.getAllPhotos();
    res.json(photos);
  });

  app.get('/api/photos/featured', async (req, res) => {
    const photos = await storage.getFeaturedPhotos();
    res.json(photos);
  });

  app.get('/api/photos/photographer/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const photos = await storage.getPhotosByPhotographer(id);
    res.json(photos);
  });

  app.get('/api/photos/category/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const photos = await storage.getPhotosByCategory(id);
    res.json(photos);
  });

  app.get('/api/photos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const photo = await storage.getPhoto(id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    res.json(photo);
  });

  app.post('/api/photos', async (req, res) => {
    try {
      const data = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(data);
      res.status(201).json(photo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  });

  // Exhibition endpoints
  app.get('/api/exhibitions', async (req, res) => {
    const exhibitions = await storage.getAllExhibitions();
    res.json(exhibitions);
  });

  app.get('/api/exhibitions/current', async (req, res) => {
    const exhibition = await storage.getCurrentExhibition();
    if (!exhibition) {
      return res.status(404).json({ message: 'No current exhibition found' });
    }
    
    res.json(exhibition);
  });

  app.get('/api/exhibitions/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const exhibition = await storage.getExhibition(id);
    if (!exhibition) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }
    
    res.json(exhibition);
  });

  app.post('/api/exhibitions', async (req, res) => {
    try {
      const data = insertExhibitionSchema.parse(req.body);
      const exhibition = await storage.createExhibition(data);
      res.status(201).json(exhibition);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  });

  // Event endpoints
  app.get('/api/events/exhibition/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const events = await storage.getEventsByExhibition(id);
    res.json(events);
  });

  app.get('/api/events/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const event = await storage.getEvent(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  });

  app.post('/api/events', async (req, res) => {
    try {
      const data = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(data);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid data', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
