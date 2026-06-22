import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    "founder_growth": "price_1Tl2meQiUZAJiSqFhRdl7TaJ",
    "founder_enterprise": "price_1Tl3FrQiUZAJiSqF8Luy3oqH",
}