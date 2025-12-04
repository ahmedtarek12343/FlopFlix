"use client";
import LogoLoop from "../LogoLoop";
import GradientText from "../GradientText";
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
    <>
      <div className="text-center py-10 font-bold text-3xl">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
        >
          Trusted Partners
        </GradientText>
      </div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Basic horizontal loop */}
        <LogoLoop
          logos={imageLogos}
          speed={120}
          direction="left"
          logoHeight={70}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#fffff008"
          ariaLabel="Technology partners"
        />
      </div>
    </>
  );
};

export default TrustedPartners;
