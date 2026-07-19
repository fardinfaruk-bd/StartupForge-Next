import { redirect } from 'next/navigation';
import Link from 'next/link';

// Lucide Icons
import { CheckCircle2, Mail, ArrowRight, HelpCircle } from 'lucide-react';
import { stripe } from '@/lib/stripe';
import { createPayment } from '@/lib/actions/payment';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });


  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    const payment = {
        email: customerEmail,
        planId: metadata.planId,
        price: metadata.priceId === "price_1Tl2meQiUZAJiSqFhRdl7TaJ" ? 49 : metadata.priceId === "price_1Tl3FrQiUZAJiSqF8Luy3oqH" ? 149 : 0
    }
    const result = await createPayment(payment);
    console.log(result);

    return (
      <div className="min-h-screen text-zinc-100 antialiased flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative Top Glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
          
          {/* Success Icon Indicator */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-inner shadow-emerald-500/10">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Heading Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black tracking-tight text-zinc-100">
              Payment Successful
            </h1>
            <p className="text-xs text-zinc-500 mt-1.5 uppercase tracking-wider font-semibold">
              Thank you for your business
            </p>
          </div>

          {/* Details Card Block */}
          <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 mb-8 space-y-4">
            <div className="flex gap-3 items-start">
              <Mail className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-zinc-400">
                A structured confirmation settlement and setup manifest will be directed to:
                <span className="block font-semibold text-zinc-200 mt-1 break-all bg-zinc-900 px-2 py-1 border border-zinc-800/40 rounded-md">
                  {customerEmail}
                </span>
              </div>
            </div>

            <div className="border-t border-zinc-800/60 pt-3 flex gap-3 items-start">
              <HelpCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-zinc-400">
                Need operational support? Connect with our founder support line via{' '}
                <a 
                  href="mailto:orders@example.com" 
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition font-medium"
                >
                  orders@example.com
                </a>
              </div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="space-y-2.5">
            <Link
              href="/dashboard/founder"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-sm font-bold tracking-wide h-11 transition shadow-sm"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/"
              className="w-full flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 text-sm font-semibold h-11 transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}