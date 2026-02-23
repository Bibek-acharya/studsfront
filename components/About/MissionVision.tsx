import React from "react";

const MissionVision: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mb-20 md:mb-24 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 md:mb-12 scroll-fade-in">
        Our Story, Mission & Vision
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-stretch justify-center">
        {/* Our Story Card */}
        <div className="xl:col-span-7">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group w-full h-full min-h-[350px] md:min-h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
              alt="Our Story"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A61EF]/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h3>
              <p className="text-sm md:text-lg text-blue-50 max-w-xl leading-relaxed">
                StudSphere is a youth-driven platform dedicated to empowering
                students across Nepal by providing them with the right guidance
                and opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Column */}
        <div className="xl:col-span-5 flex flex-col gap-4 md:gap-6">
          {/* Mission */}
          <div className="bg-mission-transparent rounded-2xl p-8 md:p-10 text-white shadow-lg flex flex-col justify-center flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <i className="fa-solid fa-crosshairs text-xl md:text-2xl"></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">
                Our Mission
              </h3>
            </div>
            <p className="text-green-50 text-sm md:text-lg leading-relaxed">
              To provide accessible, affordable, and high-quality digital
              learning tools across Nepal, bridging the academic gap and
              fostering innovation.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-primary-blue rounded-2xl p-8 md:p-10 text-white shadow-lg flex flex-col justify-center flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <i className="fa-solid fa-eye text-xl md:text-2xl"></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">
                Our Vision
              </h3>
            </div>
            <p className="text-blue-50 text-sm md:text-lg leading-relaxed">
              To create a future where every student in Nepal has the resources
              and mentorship to achieve their dreams regardless of their
              background.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
