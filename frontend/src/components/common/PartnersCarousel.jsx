import { useEffect, useState } from "react";
import unWomen from "../../assets/UNWomen.png";
import oslo from "../../assets/TheOslo.png";
import iebc from "../../assets/IEBC.jpg";
import ndi from "../../assets/NDI.png";
import idea from "../../assets/II.png";
import nimd from "../../assets/NIMD.png";
import elgia from "../../assets/ELGIA.jpg";

const sponsors = [unWomen, oslo, iebc, ndi, idea, nimd, elgia];

function PartnersCarousel() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getVisibleSponsors = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      visible.push(sponsors[(startIndex + i) % sponsors.length]);
    }
    return visible;
  };

  return (
    <section className="bg-[#f0f6ff] py-8 overflow-hidden">
      <div className="container mx-auto text-center">
        <h5 className="text-xl font-bold text-[#002147] mb-6">Partners</h5>
        <div className="flex justify-center items-center gap-8 transition-all duration-500">
          {getVisibleSponsors().map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Sponsor ${index}`}
              className="h-20 w-auto object-contain transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersCarousel;
