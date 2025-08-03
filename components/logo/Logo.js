import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <div
      className={`${dmSerif.className} text-3xl text-center py-4 font-heading`}
    >
      AI Blog
      <FontAwesomeIcon icon={faBrain} className="text-2xl text-slate-400 pl-2" />
    </div>
  );
};
