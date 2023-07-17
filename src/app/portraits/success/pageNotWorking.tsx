import { useRouter, useSearchParams } from "next/navigation";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    },
  );

  return { props: { order } };
}


export default function Success() { //{ order }
    const searchParams = useSearchParams()
    console.log('search params: ', searchParams)
    const order = getServerSideProps(searchParams)
    // const selection = searchParams.get('selection')
    const route = useRouter();

    console.log(order);
    return (
        <div>
            Success!
        </div>
    )
}