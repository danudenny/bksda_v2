export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = body.url;

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: "URL tidak ditemukan (missing)",
    });
  }

  try {
    await $fetch(url, { method: "HEAD", timeout: 5000 });

    return { status: "online" };
  } catch (error: any) {
    return { status: "offline" };
  }
});
