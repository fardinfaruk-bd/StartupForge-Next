"use client";

import React, { useState } from "react";
// HeroUI UI Components
import { Card, Button, Chip } from "@heroui/react";
// Lucide Icons
import { UserPlus, ChartLine, Rocket, HelpCircle, ChevronDown } from "lucide-react";
// Gravity UI Icons
import { Check, Xmark } from "@gravity-ui/icons";

export default function FounderPlans() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = [
    {
      name: "Free",
      id: "founder_free",
      price: "$0",
      period: "/forever",
      description: "Perfect for validating your initial startup traction.",
      icon: <UserPlus className="text-default-600" size={22} />,
      activeJobs: "Up to 3",
      analytics: "None",
      extras: [
        "Basic applicant management",
        "Standard visibility"
      ],
      buttonText: "Current Plan",
      buttonVariant: "bordered",
      buttonColor: "default",
      cardStyles: "bg-content1 border-default-200 text-foreground",
      iconBg: "bg-default-100",
    },
    {
      name: "Growth",
      id: "founder_growth",
      price: "$49",
      period: "/mo",
      description: "Scale your core team and track recruitment metrics.",
      icon: <ChartLine className="text-primary" size={22} />,
      activeJobs: "Up to 10",
      analytics: "Basic Dashboard",
      extras: [
        "Applicant tracking pipelines",
        "Direct email support"
      ],
      buttonText: "Upgrade to Growth",
      buttonVariant: "solid",
      buttonColor: "primary",
      popular: true,
      cardStyles: "bg-content1 border-primary shadow-xl shadow-primary/10 md:-translate-y-4 scale-100 md:scale-105 z-10 text-foreground",
      iconBg: "bg-primary-50 dark:bg-primary-950/50",
    },
    {
      name: "Enterprise",
      id: "founder_enterprise",
      price: "$149",
      period: "/mo",
      description: "Custom branding and white-glove talent pipeline tools.",
      icon: <Rocket className="text-warning" size={22} />,
      activeJobs: "Up to 50",
      analytics: "Advanced Suite",
      extras: [
        "Featured talent listings",
        "Team access & collaboration",
        "Custom founder branding",
        "Priority 24/7 support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "flat",
      buttonColor: "secondary",
      cardStyles: "bg-neutral-900 text-neutral-50 border-neutral-800 dark:bg-content1 dark:text-foreground dark:border-default-200",
      iconBg: "bg-neutral-800 dark:bg-default-100",
    },
  ];

  const faqs = [
    {
      question: "How do I switch or upgrade my plan?",
      answer: "You can seamlessly transition between plans right from your billing settings. Upgrades take effect immediately with pro-rated charges applied to your current cycle, while downgrades sync up at the end of your billing cycle so you don't lose active progress mid-month."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your active subscription at any time with zero hassle. Once canceled, your premium recruitment infrastructure remains completely functional until your current monthly settlement period finishes."
    },
    {
      question: "Do you offer refunds?",
      answer: "We provide a 14-day refund window on initial upgrades if you run into structural changes or find the plan isn't a tight fit for your startup's current stage. Reach out directly to our founder support team to request a review."
    },
    {
      question: "Which payment options are accepted?",
      answer: "We accept all major credit card providers (Visa, Mastercard, American Express) processed securely via Stripe. For high-volume Enterprise configurations, custom corporate billing and manual invoicing structures can also be arranged."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 py-24 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-20 flex flex-col items-center">
        <Chip
          variant="flat"
          color="primary"
          size="sm"
          className="mb-4 font-semibold px-3 py-1"
        >
          Pricing Plans
        </Chip>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl text-foreground mb-4">
          Founder Plans
        </h1>
        <p className="text-lg text-default-500 max-w-xl">
          Select the perfect infrastructure tier to build your core startup team.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 border-small flex flex-col justify-between transition-all duration-300 ${plan.cardStyles}`}
            radius="2xl"
            
          >
            {/* Main Wrapper using simple div container inside Card to handle vertical separation */}
            <div className="flex flex-col justify-between h-full">
              <div>
                {/* Top Row: Icon & Status Tag */}
                <Card.Header className="flex justify-between items-start p-0 mb-6">
                  <div className={`p-3 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                    {plan.icon}
                  </div>
                  {plan.popular && (
                    <Chip
                      color="primary"
                      variant="solid"
                      size="sm"
                      className="font-semibold text-xs px-2 shadow-sm"
                    >
                      Most Popular
                    </Chip>
                  )}
                </Card.Header>

                {/* Title & Description */}
                <div className="space-y-2 mb-6">
                  <Card.Title className="text-2xl font-bold tracking-tight m-0 p-0">
                    {plan.name}
                  </Card.Title>
                  <Card.Description className={`text-sm ${plan.name === "Enterprise"
                    ? "text-neutral-400 dark:text-default-500"
                    : "text-default-500"
                    }`}>
                    {plan.description}
                  </Card.Description>
                </div>

                {/* Price Metric */}
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                  <span className={`ml-1.5 text-sm font-medium ${plan.name === "Enterprise"
                    ? "text-neutral-400 dark:text-default-500"
                    : "text-default-500"
                    }`}>
                    {plan.period}
                  </span>
                </div>

                {/* Content / Technical Core Metrics */}
                <Card.Content className="p-0 space-y-4">
                  <div className={`space-y-3 pb-5 border-b ${plan.name === "Enterprise"
                    ? "border-neutral-800 dark:border-default-100"
                    : "border-default-100"
                    }`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className={plan.name === "Enterprise" ? "text-neutral-400 dark:text-default-500" : "text-default-500"}>
                        Active Job Posts
                      </span>
                      <span className={`font-semibold px-2.5 py-0.5 rounded-lg text-xs ${plan.name === "Enterprise"
                        ? "bg-neutral-800 text-neutral-200 dark:bg-default-100 dark:text-foreground"
                        : "bg-default-100 text-foreground"
                        }`}>
                        {plan.activeJobs}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className={plan.name === "Enterprise" ? "text-neutral-400 dark:text-default-500" : "text-default-500"}>
                        Analytics Suite
                      </span>
                      <span className={`font-semibold text-xs px-2.5 py-0.5 rounded-lg ${plan.analytics === "None"
                        ? "text-default-400 bg-default-100/70"
                        : plan.analytics.includes("Basic")
                          ? "text-primary bg-primary-50 dark:bg-primary-950/30"
                          : "text-secondary bg-secondary-50 dark:bg-secondary-950/30"
                        }`}>
                        {plan.analytics}
                      </span>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className={`text-xs font-bold uppercase tracking-widest ${plan.name === "Enterprise" ? "text-neutral-500 dark:text-default-400" : "text-default-400"
                      }`}>
                      Features Included
                    </p>
                    <ul className="space-y-3">
                      {plan.extras.map((extra, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <span className="text-success flex-shrink-0 mt-0.5">
                            <Check width={15} height={15} strokeWidth={2.5} />
                          </span>
                          <span className={
                            plan.name === "Enterprise"
                              ? "text-neutral-300 dark:text-default-700"
                              : "text-default-700"
                          }>
                            {extra}
                          </span>
                        </li>
                      ))}

                      {plan.name === "Free" && (
                        <li className="flex items-start gap-3 text-sm text-default-400/70 dark:text-default-500 line-through">
                          <span className="text-default-400/70 dark:text-default-500 flex-shrink-0 mt-0.5">
                            <Xmark width={15} height={15} />
                          </span>
                          <span>Advanced metrics & branding</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </Card.Content>
              </div>
            </div>

            {/* CTA Button Wrapper */}
            <Card.Footer className="p-0 pt-8 mt-auto">
              <div className="w-full">
                <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="plan_id" value={plan.id} />
                  <section>
                    <Button isDisabled={plan.id === "founder_free"} type="submit" role="link" className={`w-full font-bold text-sm tracking-wide shadow-sm h-11 ${plan.name === "Enterprise"
                      ? "bg-white text-black hover:bg-neutral-200 dark:bg-secondary dark:text-white dark:hover:bg-secondary/90"
                      : ""
                      }`}>
                      {plan.buttonText}
                    </Button>
                  </section>
                </form>
              </div>

            </Card.Footer>
          </Card>
        ))}
      </div>

      {/* FAQ Accordion Section Layout Wrapper */}
      <div className="max-w-3xl mx-auto border-t border-zinc-800 mt-32 pt-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-xs text-zinc-500 mt-1">Have concerns regarding billing pipelines? Find instant clarify indicators below.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-colors duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left p-4 gap-4 text-zinc-200 hover:text-white transition"
                >
                  <span className="text-sm font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`}
                  />
                </button>

                {/* Collapsible Accordion Element View Body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-zinc-800/60' : 'max-h-0'}`}
                >
                  <div className="p-4 text-xs text-zinc-400 leading-relaxed bg-zinc-900/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}