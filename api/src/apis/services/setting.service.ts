import prisma from '@/apis/databases/init.prisma'

const getAllThumbnails = async () => {
  return await prisma.setting.findMany({
    select: {
      id: true,
      imageUrl: true,
      alt: true,
    },
  })
}

const editThumbnail = async (ids: string[], imageUrls: string[], alts: string[]) => {
  for (let i = 0; i < ids.length; i++) {
    await prisma.setting.update({
      where: {
        id: ids[i],
      },
      data: {
        imageUrl: imageUrls[i],
        alt: alts[i],
      },
    })
  }
}

export default {
  getAllThumbnails,
  editThumbnail,
}
