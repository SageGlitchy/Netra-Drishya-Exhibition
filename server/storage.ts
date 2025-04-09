import {
  users, User, InsertUser,
  photographers, Photographer, InsertPhotographer,
  categories, Category, InsertCategory,
  photos, Photo, InsertPhoto,
  exhibitions, Exhibition, InsertExhibition,
  events, Event, InsertEvent
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Photographer operations
  getPhotographer(id: number): Promise<Photographer | undefined>;
  getAllPhotographers(): Promise<Photographer[]>;
  getFeaturedPhotographers(): Promise<Photographer[]>;
  createPhotographer(photographer: InsertPhotographer): Promise<Photographer>;

  // Category operations
  getCategory(id: number): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Photo operations
  getPhoto(id: number): Promise<Photo | undefined>;
  getAllPhotos(): Promise<Photo[]>;
  getPhotosByCategory(categoryId: number): Promise<Photo[]>;
  getPhotosByPhotographer(photographerId: number): Promise<Photo[]>;
  getFeaturedPhotos(): Promise<Photo[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;

  // Exhibition operations
  getExhibition(id: number): Promise<Exhibition | undefined>;
  getAllExhibitions(): Promise<Exhibition[]>;
  getCurrentExhibition(): Promise<Exhibition | undefined>;
  createExhibition(exhibition: InsertExhibition): Promise<Exhibition>;

  // Event operations
  getEvent(id: number): Promise<Event | undefined>;
  getEventsByExhibition(exhibitionId: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private photographers: Map<number, Photographer>;
  private categories: Map<number, Category>;
  private photos: Map<number, Photo>;
  private exhibitions: Map<number, Exhibition>;
  private events: Map<number, Event>;

  private userId: number;
  private photographerId: number;
  private categoryId: number;
  private photoId: number;
  private exhibitionId: number;
  private eventId: number;

  constructor() {
    this.users = new Map();
    this.photographers = new Map();
    this.categories = new Map();
    this.photos = new Map();
    this.exhibitions = new Map();
    this.events = new Map();

    this.userId = 1;
    this.photographerId = 1;
    this.categoryId = 1;
    this.photoId = 1;
    this.exhibitionId = 1;
    this.eventId = 1;

    this.initializeWithSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Photographer operations
  async getPhotographer(id: number): Promise<Photographer | undefined> {
    return this.photographers.get(id);
  }

  async getAllPhotographers(): Promise<Photographer[]> {
    return Array.from(this.photographers.values());
  }

  async getFeaturedPhotographers(): Promise<Photographer[]> {
    return Array.from(this.photographers.values()).filter(
      (photographer) => photographer.featured
    );
  }

  async createPhotographer(insertPhotographer: InsertPhotographer): Promise<Photographer> {
    const id = this.photographerId++;
    const photographer: Photographer = { ...insertPhotographer, id };
    this.photographers.set(id, photographer);
    return photographer;
  }

  // Category operations
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Photo operations
  async getPhoto(id: number): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values());
  }

  async getPhotosByCategory(categoryId: number): Promise<Photo[]> {
    return Array.from(this.photos.values()).filter(
      (photo) => photo.categoryId === categoryId
    );
  }

  async getPhotosByPhotographer(photographerId: number): Promise<Photo[]> {
    return Array.from(this.photos.values()).filter(
      (photo) => photo.photographerId === photographerId
    );
  }

  async getFeaturedPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).filter(
      (photo) => photo.featured
    );
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = this.photoId++;
    const photo: Photo = { 
      ...insertPhoto, 
      id,
      dateAdded: new Date()
    };
    this.photos.set(id, photo);
    return photo;
  }

  // Exhibition operations
  async getExhibition(id: number): Promise<Exhibition | undefined> {
    return this.exhibitions.get(id);
  }

  async getAllExhibitions(): Promise<Exhibition[]> {
    return Array.from(this.exhibitions.values());
  }

  async getCurrentExhibition(): Promise<Exhibition | undefined> {
    const now = new Date();
    return Array.from(this.exhibitions.values()).find(
      (exhibition) => new Date(exhibition.startDate) <= now && new Date(exhibition.endDate) >= now
    );
  }

  async createExhibition(insertExhibition: InsertExhibition): Promise<Exhibition> {
    const id = this.exhibitionId++;
    const exhibition: Exhibition = { ...insertExhibition, id };
    this.exhibitions.set(id, exhibition);
    return exhibition;
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEventsByExhibition(exhibitionId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.exhibitionId === exhibitionId
    );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  private initializeWithSampleData() {
    // Add sample photographers
    const photographers: InsertPhotographer[] = [
      {
        name: "Aanya Sharma",
        bio: "Specializes in portrait and street photography, capturing raw emotions and untold stories through her lens.",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        instagram: "@aanya.frames",
        email: "aanya.s@netra.club",
        featured: true
      },
      {
        name: "Vikram Nair",
        bio: "Architecture and urban landscape photographer who finds beauty in geometric patterns and urban chaos.",
        profileImage: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        instagram: "@viks.perspective",
        email: "vikram.n@netra.club",
        featured: true
      },
      {
        name: "Zara Patel",
        bio: "Nature and wildlife photographer with a passion for documenting India's diverse ecosystems.",
        profileImage: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        instagram: "@zara.wilderness",
        email: "zara.p@netra.club",
        featured: true
      }
    ];

    photographers.forEach(p => {
      this.createPhotographer(p);
    });

    // Add sample categories
    const categories: InsertCategory[] = [
      {
        name: "Portrait",
        description: "The art of capturing personality and emotion in a single frame."
      },
      {
        name: "Landscape",
        description: "Breathtaking views of natural scenery and dramatic horizons."
      },
      {
        name: "Street",
        description: "Candid moments from everyday life in urban environments."
      },
      {
        name: "Abstract",
        description: "Photography that challenges perceptions through unconventional perspectives."
      }
    ];

    categories.forEach(c => {
      this.createCategory(c);
    });

    // Add sample photos
    const photos: InsertPhoto[] = [
      {
        title: "Urban Reflections",
        description: "Modern architecture creating symmetrical patterns in glass and steel.",
        imageUrl: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        photographerId: 2,
        categoryId: 4,
        featured: true
      },
      {
        title: "Mountain Serenity",
        description: "Dawn breaking over the Himalayan peaks, capturing the first light.",
        imageUrl: "https://images.unsplash.com/photo-1536048810607-3dc7f86981cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1536048810607-3dc7f86981cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        photographerId: 3,
        categoryId: 2,
        featured: true
      },
      {
        title: "Candid Moments",
        description: "The joy of unexpected laughter captured in a split second.",
        imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        photographerId: 1,
        categoryId: 1,
        featured: true
      },
      {
        title: "City Life",
        description: "The hustle and energy of metropolitan existence, frozen in time.",
        imageUrl: "https://images.unsplash.com/photo-1605547560182-b491252b6b4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1605547560182-b491252b6b4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        photographerId: 1,
        categoryId: 3,
        featured: false
      },
      {
        title: "Geometric Patterns",
        description: "Finding order and harmony in architectural elements.",
        imageUrl: "https://images.unsplash.com/photo-1520853504280-249b72dc947c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1520853504280-249b72dc947c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        photographerId: 2,
        categoryId: 4,
        featured: false
      },
      {
        title: "Wildlife Majesty",
        description: "A royal Bengal tiger spotted in its natural habitat.",
        imageUrl: "https://images.unsplash.com/photo-1615824996195-f780bba7cfab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1615824996195-f780bba7cfab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        photographerId: 3,
        categoryId: 2,
        featured: true
      }
    ];

    photos.forEach(p => {
      this.createPhoto(p);
    });

    // Add exhibition
    const exhibition: InsertExhibition = {
      name: "Drishya",
      description: "A visual journey through the lens of NETRA's talented photographers at Utkansh 2023. Experience diverse perspectives and artistic expressions captured in still frames.",
      location: "University Arts Gallery, Utkansh Building",
      startDate: new Date(2025, 3, 10), // April 10, 2025
      endDate: new Date(2025, 3, 13), // April 13, 2025
      coverImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5831474374966!2d77.53410537518788!3d12.934193515666305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzAzLjEiTiA3N8KwMzInMTAuOCJF!5e0!3m2!1sen!2sin!4v1627980977128!5m2!1sen!2sin"
    };

    this.createExhibition(exhibition);

    // Add events
    const events: InsertEvent[] = [
      {
        exhibitionId: 1,
        name: "Opening Ceremony",
        description: "Inauguration of Drishya exhibition by the Dean of Fine Arts.",
        date: new Date(2025, 4, 10),
        time: "11:00 AM"
      },
      {
        exhibitionId: 1,
        name: "Photography Workshop",
        description: "Learn the basics of composition and lighting with master photographer Rajiv Mehta.",
        date: new Date(2025, 4, 11),
        time: "2:00 PM"
      },
      {
        exhibitionId: 1,
        name: "Panel Discussion",
        description: "The future of digital photography in the age of AI and computational imaging.",
        date: new Date(2025, 3, 12),
        time: "4:00 PM"
      },
      {
        exhibitionId: 1,
        name: "Award Ceremony",
        description: "Recognition of outstanding photographs and photographers from the exhibition.",
        date: new Date(2025, 3, 13),
        time: "5:00 PM"
      }
    ];

    events.forEach(e => {
      this.createEvent(e);
    });
  }
}

export const storage = new MemStorage();
