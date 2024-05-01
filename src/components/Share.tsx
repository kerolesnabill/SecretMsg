import { FC } from "react";
import facebook from "../assets/icons/facebook.svg";
import x from "../assets/icons/x-twitter.svg";
import whatsapp from "../assets/icons/whatsapp.svg";

const Share: FC<{ url: string }> = ({ url }) => {
  const text =
    "Give me your opinion about me in complete confidentiality and frankness.";

  const facebookUrl = `https://www.facebook.com/sharer.php?u=${url}`;
  const xUrl = `https://x.com/intent/post?text=${text}&hashtags=SecretMsg&url=${url}`;
  const whatsappUrl = `https://wa.me/?text=${text}+${url}&type=custom_url&app_absent=0`;

  return (
    <div className="text-center p-4 grid grid-cols-1">
      <p className="text-lg font-bold mb-4">Share</p>

      <a
        target="_blank"
        href={facebookUrl}
        className="btn bg-blue-600 text-white mt-2"
      >
        <img className="w-8" src={facebook} alt="Facebook icon" />
        Facebook
      </a>
      <a
        target="_blank"
        href={xUrl}
        className="btn bg-slate-950  text-white mt-2"
      >
        <img className="w-8" src={x} alt="X icon" />
        X-twitter
      </a>
      <a
        target="_blank"
        href={whatsappUrl}
        className="btn bg-green-600  text-white mt-2"
      >
        <img className="w-8" src={whatsapp} alt="X icon" />
        Whatsapp
      </a>
    </div>
  );
};

export default Share;
