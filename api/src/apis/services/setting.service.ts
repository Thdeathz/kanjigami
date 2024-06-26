import prisma from '@/apis/databases/init.prisma'

const getAllThumbnails = async () => {
  return await prisma.setting.findMany({
    select: {
      id: true,
      imageUrl: true,
      alt: true,
    },
    orderBy: {
      id: 'asc',
    },
  })
}

type EditThumbnailProps = {
  ids: string[]
  imageUrls: string[]
  alts: string[]
  newImageUrls: string[]
}

const editThumbnail = async ({ ids, imageUrls, alts, newImageUrls }: EditThumbnailProps) => {
  for (let i = 0; i < ids.length; i++) {
    let imageUrl = ''
    if (imageUrls?.length > 0 && imageUrls[i]) {
      imageUrl = imageUrls[i]
    } else {
      imageUrl = newImageUrls.shift() as string
    }

    await prisma.setting.update({
      where: {
        id: ids[i],
      },
      data: {
        imageUrl,
        alt: alts[i],
      },
    })
  }
}

export default {
  getAllThumbnails,
  editThumbnail,
}
