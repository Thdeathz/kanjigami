/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import type Stripe from 'stripe'

import { JwtPayload } from '../@types/auth'

import { ICheckoutSessionCustomerMetadata, ICheckoutSessionRequest } from '@/apis/@types/plus'
import checkoutService from '@/apis/services/checkout.service'
import userService from '@/apis/services/user.service'
import makeResponse from '@/apis/utils/make-response'
import { stripe } from '@/configs/init.stripe'

/**
 * @desc Create a checkout session for new subscription
 * @route POST /plus
 * @access Private
 */
export const createCheckoutSession: RequestHandler = async (req, res) => {
  const { product, userId } = req.body as ICheckoutSessionRequest

  const customer = await stripe.customers.create({
    metadata: {
      userId,
      product,
    },
  })

  const prices = await stripe.prices.list({
    product,
    currency: 'usd',
  })

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [{ price: prices.data[0].id, quantity: 1 }],
    mode: 'subscription',
    customer: customer.id,
    success_url: `${process.env.WEB_URL}/plus?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.WEB_URL}/plus?canceled=true`,
  })

  res.json(makeResponse.defaultResponse('Checkout session created', StatusCodes.OK, { url: session.url }))
}

/**
 * @desc Handle stripe webhook
 * @route POST /plus/webhook
 * @access Public
 */
export const stripeWebhook: RequestHandler = async (req, res) => {
  let data
  let eventType: Stripe.Event['type']

  const webhookSecret = process.env.STRIPE_WEB_HOOK as string

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event: Stripe.Event
    const signature = req.headers['stripe-signature']

    try {
      event = stripe.webhooks.constructEvent(req.body, signature as string | string[], webhookSecret)
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`)
      res.sendStatus(400)
      return
    }
    // Extract the object from the event.
    data = event.data.object
    eventType = event.type
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object
    eventType = req.body.type
  }

  // Handle the checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    const customerData = (await stripe.customers.retrieve(data.customer)) as any
    console.log('==> customerData', data.customer, customerData)
    const userData = customerData.metadata as ICheckoutSessionCustomerMetadata

    const { userId } = await checkoutService.saveCheckoutSession(
      userData.userId,
      data.id,
      userData.product,
      data.customer,
    )
    await userService.updateUserPlan(userId)
  }

  // Handle the customer.subscription.updated event
  if (eventType === 'customer.subscription.updated') {
    const customerData = (await stripe.customers.retrieve(data.customer)) as any
    const userData = customerData.metadata as ICheckoutSessionCustomerMetadata

    if (data.status === 'canceled') {
      await checkoutService.cancelCheckoutSession(userData.userId, new Date(data.cancel_at))
    }
  }

  res.status(200).end()
}

export const createSubscriptionManagementLink: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const customer = await checkoutService.getCheckoutSession(user.id)

  if (!customer) {
    res.json(makeResponse.defaultResponse('Customer not found', StatusCodes.NOT_FOUND))
    return
  }

  const link = await stripe.billingPortal.sessions.create({
    customer: customer.customerId,
    return_url: `${process.env.WEB_URL}/plus`,
  })

  res.json(makeResponse.defaultResponse('Billing portal link created', StatusCodes.OK, { url: link.url }))
}
