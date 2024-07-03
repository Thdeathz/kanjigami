import prisma from '@/apis/databases/init.prisma'

const saveCheckoutSession = async (userId: string, sessionId: string, productId: string, customerId: string) => {
  return await prisma.checkout.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      customerId,
      sessionId,
      productId,
      successAt: new Date(),
    },
  })
}

const getCheckoutSession = async (userId: string) => {
  return await prisma.checkout.findUnique({
    where: {
      userId,
    },
    select: {
      customerId: true,
    },
  })
}

const cancelCheckoutSession = async (userId: string, cancelAt: Date) => {
  await prisma.checkout.update({
    where: {
      userId,
    },
    data: {
      cancelAt: new Date(cancelAt),
    },
  })

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      state: 'NORMAL',
    },
  })
}

export default {
  saveCheckoutSession,
  getCheckoutSession,
  cancelCheckoutSession,
}
