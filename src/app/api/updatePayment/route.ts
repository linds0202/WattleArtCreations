import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
})
//: NextApiRequest, : NextApiResponse<any>
export async function POST(
  req: any
) {

  let data = await req.json();

  
  const session = await stripe.checkout.sessions.create({
      line_items: data.items.map((item: any) => {
          return {
              price_data: {
                  currency: "USD",
                  product_data: {
                      name: item.portraitTitle,
                      description: item.mode,
                  },
                  unit_amount: item.price * 100,
              },
              quantity: 1
          }
      }),
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `http://localhost:3000/portraits/success?portraitId=${data.items[0].id}`, //?&session_id=${session.id}
      cancel_url: 'http://localhost:3000/'
  })
  console.log('in api session is: ', session)
  return NextResponse.json({session})
}
