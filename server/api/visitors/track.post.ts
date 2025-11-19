import { PrismaClient } from "@prisma/client";
import crypto from 'crypto'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Path is required',
    })
  }

  const userAgent = getRequestHeader(event, 'user-agent') || 'unknown'
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

  const salt = process.env.IP_SALT || 'rahasia-dapur-coding' 
  const ipHash = crypto
    .createHash('sha256')
    .update(ip + salt)
    .digest('hex')

  const postId = body.postId ? String(body.postId) : null

  try {
    const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    const existingView = await prisma.pageView.findFirst({
      where: {
        ipHash: ipHash,
        postId: postId,
        path: postId ? undefined : body.path,
        createdAt: {
          gte: twentyFourHoursAgo
        }
      }
    })

    if (existingView) {
      return {
        success: true,
        message: 'View already counted within 24h',
        skipped: true
      }
    }

    const newView = await prisma.pageView.create({
      data: {
        path: body.path,
        ipHash: ipHash,
        userAgent: userAgent,
        postId: postId
      }
    })

    return {
      success: true,
      data: newView
    }

  } catch (error) {
    console.error('Tracking Error:', error)
    return {
      success: false,
      message: 'Failed to track view'
    }
  }
})