import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const id = event.context.params?.id;
    if (!id) {
      return errorResponse("ID is required");
    }

    const body = await readBody(event);
    const { 
      name, 
      latinName, 
      imageUrl, 
      description, 
      order, 
      isActive,
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

    // Check if exists
    const existing = await prisma.fokusKonservasi.findUnique({
      where: { id },
    });

    if (!existing) {
      return createError({
        statusCode: 404,
        statusMessage: "Not Found",
        data: errorResponse("Species not found"),
      });
    }

    // Handle slug update if name changed
    let slug = existing.slug;
    if (name !== existing.name) {
      const baseSlug = generateSlug(name);
      slug = await generateUniqueSlug(baseSlug, async (s) => {
        const check = await prisma.fokusKonservasi.findUnique({
          where: { slug: s },
        });
        return !!check && check.id !== id;
      });
    }

    // Update species
    const species = await prisma.fokusKonservasi.update({
      where: { id },
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
        order: order ?? existing.order,
        isActive: isActive ?? existing.isActive,
      },
    });

    return successResponse("Species updated successfully", species);
  } catch (error: any) {
    console.error("Update species error:", error);
    return errorResponse("Failed to update species", error.message);
  }
});
