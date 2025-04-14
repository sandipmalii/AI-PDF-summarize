import { cn } from "@/lib/utils";
import {
  containerVariants,
  itemVariants,
  pricingPlans,
} from "@/utils/constants";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";
import { motion } from "framer-motion";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const listVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={listVariant}
      className="relative w-full max-w-lg hover:scale-105 transition-all duration-300"
    >
      <MotionDiv
        variants={listVariant}
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        {/* Card Header */}
        <MotionDiv
        variants={listVariant}
          className="flex justify-between items-center gap-4"
        >
         <MotionDiv
        variants={listVariant}>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base text-gray-500 mt-2">{description}</p>
          </MotionDiv>
        </MotionDiv>

        {/* Price Section */}
        <MotionDiv
        variants={listVariant}>
          <p className="text-5xl tracking-light font-extrabold">${price}</p>
          <MotionDiv
            variants={itemVariants}
            className="flex flex-col justify-end mb-1"
          >
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </MotionDiv>
        </MotionDiv>

        {/* Feature List */}
        <MotionDiv variants={itemVariants} className="flex-1">
          <ul className="space-y-2.5 leading-relaxed text-base">
            {items.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-center gap-2"
                variants={listVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <CheckIcon size={18} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </MotionDiv>

        {/* Buy Now Button */}
        <MotionDiv
        variants={listVariant}
          className="space-y-2 flex justify-center w-full"
        >
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
              id === "pro" ? "border-rose-900" : "border-rose-100"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <MotionDiv
        variants={itemVariants}
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12"
      >
        <MotionDiv
          variants={itemVariants}
          className="flex items-center justify-center w-full pb-12"
        >
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </MotionDiv>

        <MotionDiv
          variants={itemVariants}
          className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"
        >
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </MotionDiv>
      </MotionDiv>
    </MotionSection>
  );
}
