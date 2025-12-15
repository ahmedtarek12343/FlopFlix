"use client";
import LogoLoop from "../LogoLoop";
import GradientText from "../GradientText";
import { motion } from "framer-motion";
const imageLogos = [
  {
    src: "https://1000logos.net/wp-content/uploads/2025/10/CALB-Logo.png",
    alt: "CALB",
    href: "https://1000logos.net/wp-content/uploads/2025/10/CALB-Logo.png",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2021/05/Jollibee-logo.png",
    alt: "Company 2",
    href: "https://www.jollibeefoods.com/",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2021/04/Hogwarts-Logo.png",
    alt: "Company 3",
    href: "https://www.hogwartslegacy.com/en-us",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2021/04/Ferrari-logo.png",
    alt: "Company 3",
    href: "https://www.ferrari.com/en-FI",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2025/11/Jolly-Rancher-Logo.png",
    alt: "Company 3",
    href: "https://www.hersheyland.com/jolly-rancher",
  },
];
const TrustedPartners = () => {
  return (
    <section className="py-24 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-bold text-4xl md:text-5xl"
      >
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
        >
          Trusted Partners
        </GradientText>
      </motion.div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Basic horizontal loop */}
        <LogoLoop
          logos={imageLogos}
          speed={120}
          direction="left"
          logoHeight={90}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#191919" // approximate dark background color
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
};

export default TrustedPartners;
