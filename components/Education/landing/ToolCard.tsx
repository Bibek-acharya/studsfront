const ToolCard = ({ title, icon, color, bg, onClick }: any) => (
  <div className="bg-white rounded-[24px] p-7 border border-[#f1f1f4] flex flex-col hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={onClick}>
    <div className={`w-[60px] h-[60px] rounded-[18px] flex items-center justify-center mb-6 group-hover:scale-110 transition-all`} style={{ backgroundColor: bg, color: color }}>
      <i className={`ph-bold ${icon} text-2xl`}></i>
    </div>
    <h3 className="text-[20px] font-bold text-[#111827] mb-3">{title}</h3>
    <p className="text-[14px] text-gray-500 mb-8 flex-grow leading-relaxed">Filter thousands of institutions by location, major, tuition, and ranking to find your perfect match.</p>
    <button className="w-full py-3.5 text-white text-[15px] font-bold rounded-xl transition-colors" style={{ backgroundColor: color }}>Explore Now</button>
  </div>
);

export default ToolCard;