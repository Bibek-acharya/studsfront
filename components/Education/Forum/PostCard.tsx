import React, { useState } from "react";

interface PostCardProps {
  author: string;
  category: string;
  avatar: string;
  time: string;
  title: string;
  content: string;
  upvotes: number;
  answers: number;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  category,
  avatar,
  time,
  title,
  content,
  upvotes,
  answers,
}) => {
  const [votes, setVotes] = useState(upvotes);

  return (
    <article className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={avatar}
          className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
          alt="User"
        />
        <div>
          <h4 className="font-black text-slate-900 text-lg hover:text-[#2563EB] cursor-pointer transition-colors flex items-center gap-2">
            {author}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-[#EEF2FF] text-[#2563EB] px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-blue-50">
              {category}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <h3 className="font-black text-2xl text-slate-900 mb-4 leading-tight group-hover:text-[#2563EB] transition-colors cursor-pointer">
          {title}
        </h3>
        <p className="text-slate-500 text-lg leading-relaxed mb-6 font-medium">
          {content}
        </p>
      </div>

      {/* Footer / Interaction */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-6">
            <i className="fa-solid fa-arrow-up text-xl text-slate-400 hover:text-[#2563EB] cursor-pointer transition-colors active:scale-90"></i>
            <span className="text-xl font-black text-slate-700">{votes}</span>
            <i className="fa-solid fa-arrow-down text-xl text-slate-400 hover:text-rose-500 cursor-pointer transition-colors active:scale-90"></i>
          </div>
          <button className="flex items-center gap-3 text-slate-400 hover:text-blue-500 transition-colors">
            <i className="fa-regular fa-comment-dots text-2xl"></i>
            <span className="text-lg font-black">{answers} Answer</span>
          </button>
        </div>

        <div className="flex items-center gap-6 text-slate-400 font-black">
          <i className="fa-regular fa-heart text-2xl hover:text-rose-500 cursor-pointer transition-colors"></i>
          <i className="fa-solid fa-share-nodes text-2xl hover:text-blue-500 cursor-pointer transition-colors"></i>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
