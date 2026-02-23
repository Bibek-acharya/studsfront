import React from "react";

const PhotoGrid: React.FC = () => {
  const row1 = [
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[356px]",
    },
    {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[289px]",
    },
    {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[356px]",
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[309px]",
    },
  ];

  const row2 = [
    {
      src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[309px]",
    },
    {
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[356px]",
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[289px]",
    },
    {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      width: "lg:w-[356px]",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 items-center overflow-hidden">
      {/* Row 1 */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 w-full">
        {row1.map((item, i) => (
          <div
            key={`r1-${i}`}
            className={`group relative overflow-hidden rounded-lg shadow-sm w-full sm:w-[calc(50%-16px)] ${item.width} h-[200px] md:h-[250px] animate-fadeInUp flex-shrink-0 flex-grow`}
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            <img
              src={item.src}
              alt={`StudSphere Team 1-${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 w-full">
        {row2.map((item, i) => (
          <div
            key={`r2-${i}`}
            className={`group relative overflow-hidden rounded-lg shadow-sm w-full sm:w-[calc(50%-16px)] ${item.width} h-[200px] md:h-[250px] animate-fadeInUp flex-shrink-0 flex-grow`}
            style={{ animationDelay: `${0.1 * (i + 4)}s` }}
          >
            <img
              src={item.src}
              alt={`StudSphere Team 2-${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
