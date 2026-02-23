import React from "react";

interface Props {
  type: "education" | "job";
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
  buttonText: string;
  buttonIcon: string;
  reverse?: boolean;
  bgColor?: string;
  onAction?: () => void;
}

const PlatformSection: React.FC<Props> = ({
  type,
  title,
  description,
  bullets,
  imageUrl,
  buttonText,
  buttonIcon,
  reverse,
  bgColor = "bg-white",
  onAction,
}) => {
  const isEdu = type === "education";

  return (
    <section className={`py-20 md:py-32 ${bgColor}`}>
      <div className="w-full px-6 md:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}
        >
          <div className={`${reverse ? "lg:order-2" : "lg:order-1"}`}>
            <div
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-8 border ${
                isEdu
                  ? "bg-blue-50 text-blue-600 border-blue-100"
                  : "bg-green-50 text-green-600 border-green-100"
              }`}
            >
              <i
                className={`fas ${isEdu ? "fa-book-open" : "fa-briefcase"}`}
              ></i>
              StudSphere for {isEdu ? "Education" : "Job"}
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed">
              {description}
            </p>

            <ul className="space-y-5 mb-12">
              {bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 text-slate-700 font-medium md:text-lg"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isEdu ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                  >
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  {bullet}
                </li>
              ))}
            </ul>

            <button
              onClick={onAction}
              className={`w-full sm:w-auto px-10 py-4 rounded-lg font-bold transition-all shadow-xl flex items-center gap-3 justify-center group ${
                isEdu
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                  : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
              }`}
            >
              {buttonText}
              <i
                className={`fas ${buttonIcon} transition-transform group-hover:translate-x-1`}
              ></i>
            </button>
          </div>

          <div className={`${reverse ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl blur-2xl group-hover:opacity-75 transition-opacity"></div>
              <div className="relative h-[300px] sm:h-[450px] lg:h-[550px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
