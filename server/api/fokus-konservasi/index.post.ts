import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    const { 
      name, 
      latinName, 
      imageUrl, 
      description, 
      order,
      status,
      habitat,
      population,
      weight,
      length,
      threats,
      efforts
    } = body;

    // Validation
    if (!name || !latinName || !imageUrl) {
      return errorResponse("Name, Latin name, and image URL are required");
    }

    // Generate slug
    const baseSlug = generateSlug(name);
    const slug = await generateUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.fokusKonservasi.findUnique({
        where: { slug: s },
      });
      return !!existing;
    });

    // Create species
    const species = await prisma.fokusKonservasi.create({
      data: {
        name,
        latinName,
        slug,
        imageUrl,
        description: description || null,
        status: status || null,
        habitat: habitat || null,
        population: population || null,
        weight: weight || null,
        length: length || null,
        threats: threats || [],
        efforts: efforts || [],
        order: order || 0,
        isActive: true,
      },
    });

    return successResponse("Species created successfully", species);
  } catch (error: any) {
    console.error("Create species error:", error);
    return errorResponse("Failed to create species", error.message);
  }
});
