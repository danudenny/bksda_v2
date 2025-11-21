import { defineEventHandler, getQuery } from 'h3'
import prisma from '../../server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = query.q as string

  if (!q || q.trim().length === 0) {
    return []
  }

  const searchTerm = q.trim()
  
  try {
    const [posts, fokus, kawasan, announcements] = await Promise.all([
      // Search Posts
      prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { content: { contains: searchTerm, mode: 'insensitive' } },
          ],
          published: true,
        },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
        }
      }),
      
      // Search Fokus Konservasi
      prisma.fokusKonservasi.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { latinName: { contains: searchTerm, mode: 'insensitive' } },
          ],
          isActive: true,
        },
        take: 5,
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
        }
      }),

      // Search Kawasan Locations
      prisma.kawasanLocation.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
          isActive: true,
        },
        take: 5,
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
        }
      }),

      // Search Announcements
      prisma.announcement.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { content: { contains: searchTerm, mode: 'insensitive' } },
          ],
          isActive: true,
        },
        take: 5,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          title: true,
        }
      })
    ])

    const results = [
      ...posts.map(p => ({
        id: `post-${p.id}`,
        title: p.title,
        category: 'Berita',
        href: `/berita/${p.slug}`,
      })),
      ...fokus.map(f => ({
        id: `fokus-${f.id}`,
        title: f.name,
        category: 'Fokus Konservasi',
        href: `/konservasi/${f.slug}`,
      })),
      ...kawasan.map(k => ({
        id: `kawasan-${k.id}`,
        title: k.name,
        category: 'Kawasan Konservasi',
        href: `/kawasan/${k.slug}`,
      })),
      ...announcements.map(a => ({
        id: `ann-${a.id}`,
        title: a.title,
        category: 'Pengumuman',
        href: `/pengumuman`, // Generic link as announcements might be in a marquee or list
      }))
    ]

    return results
  } catch (error) {
    console.error('Search API Error:', error)
    return []
  }
})
