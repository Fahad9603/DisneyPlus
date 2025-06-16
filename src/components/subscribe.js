'use server'

import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export async function subscribe(formData) {
  const email = formData.get('email')
  const plan = formData.get('plan')

  if (!email || !plan) {
    return { error: 'Email and plan are required' }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      customer_email: email,
    })

    redirect(session.url)
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return { error: 'An error occurred while processing your subscription. Please try again.' }
  }
}

