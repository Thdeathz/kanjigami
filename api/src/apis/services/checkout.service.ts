import prisma from '@/apis/databases/init.prisma'

const saveCheckoutSession = async (userId: string, sessionId: string, productId: string) => {
  return await prisma.checkout.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      sessionId,
      productId,
      successAt: new Date(),
    },
  })
}

export default {
  saveCheckoutSession,
}
