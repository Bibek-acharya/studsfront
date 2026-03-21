import React, { useState } from 'react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const chats = [
    { id: 'APP-1154', name: 'Aarav Sharma', lastMsg: "Thank you for the update!", time: '10m ago', unread: false, img: '1' },
    { id: 'APP-1153', name: 'Sita Thapa', lastMsg: "When is the interview?", time: '2h ago', unread: true, img: '2' },
    { id: 'APP-1152', name: 'David Rai', lastMsg: "I've uploaded the documents.", time: '5h ago', unread: true, img: '3' },
    { id: 'APP-1151', name: 'Fatima Ali', lastMsg: "Can I resubmit my essay?", time: '1d ago', unread: false, img: '4' },
  ];

  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="fade-in h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-slate-800">Communications Hub</h2>
        <p className="text-sm text-slate-500 font-medium">Directly chat with applicants, request missing docs, and answer queries.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-1 overflow-hidden min-h-[600px]">
        {/* Contact List (Left) */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50 shrink-0">
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                placeholder="Search conversations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition font-medium shadow-inner" 
              />
            </div>
          </div>
          <div className="flex border-b border-slate-200 bg-white px-2">
            <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-primary-600 border-b-2 border-primary-600">All Messages</button>
            <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
              Unread <span className="bg-danger text-white px-2 py-0.5 rounded-full text-[10px] ml-1 shadow-sm">2</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 no-scrollbar">
            {filteredChats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={`p-4 flex items-center gap-4 cursor-pointer transition-all hover:bg-white ${
                  activeChat?.id === chat.id ? 'bg-white shadow-sm border-l-4 border-primary-600' : ''
                }`}
              >
                <div className="relative shrink-0">
                  <img src={`https://i.pravatar.cc/150?img=${chat.img}`} className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-100" />
                  {chat.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-danger border-2 border-white rounded-full"></div>}
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{chat.name}</h4>
                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">{chat.time}</span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread ? 'font-black text-slate-900' : 'text-slate-500 font-medium'}`}>
                    {chat.lastMsg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area (Right) */}
        <div className="flex-1 flex flex-col bg-slate-50 items-center justify-center relative">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="absolute top-0 left-0 right-0 p-4 border-b border-slate-200 bg-white/95 backdrop-blur flex justify-between items-center shadow-sm z-10 transition-all">
                <div className="flex items-center gap-4">
                  <img src={`https://i.pravatar.cc/150?img=${activeChat.img}`} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
                  <div>
                    <h4 className="font-black text-slate-800 text-lg leading-tight uppercase tracking-tighter">{activeChat.name}</h4>
                    <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{activeChat.id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-primary-600 hover:text-white flex items-center justify-center transition shadow-sm"><i className="fa-regular fa-id-card"></i></button>
                  <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition shadow-sm"><i className="fa-solid fa-ellipsis-v"></i></button>
                </div>
              </div>
              
              {/* Messages Container (Placeholder) */}
              <div className="w-full flex-1 p-6 space-y-6 pt-24 overflow-y-auto no-scrollbar">
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 max-w-[70%]">
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">Hello, I have a question regarding the document requirements. Do I need to notarize my income certificate?</p>
                    <span className="text-[10px] text-slate-400 font-bold mt-2 block">10:15 AM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary-500/20 max-w-[70%]">
                    <p className="text-sm font-medium text-white leading-relaxed">Yes, it must be notarized by the local government authority before submission.</p>
                    <span className="text-[10px] text-primary-200 font-bold mt-2 block text-right">10:20 AM • Delivered</span>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="w-full p-4 border-t border-slate-200 bg-white/95 backdrop-blur z-10">
                <div className="flex items-end gap-3 max-w-4xl mx-auto">
                  <button className="p-3 text-slate-400 hover:text-primary-600 transition-all bg-slate-100 rounded-xl hover:bg-primary-50 shrink-0 shadow-sm"><i className="fa-solid fa-paperclip"></i></button>
                  <div className="flex-1 relative">
                    <textarea 
                      rows={1} 
                      className="w-full bg-slate-100 border-2 border-slate-100 rounded-2xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-0 focus:border-primary-500 focus:bg-white transition resize-none max-h-32 font-medium" 
                      placeholder="Type a message..."
                    ></textarea>
                    <button className="absolute right-2 bottom-2 w-8 h-8 flex items-center justify-center text-primary-400 hover:text-primary-600 transition-colors"><i className="fa-regular fa-face-smile text-lg"></i></button>
                  </div>
                  <button className="bg-primary-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-primary-700 transition shadow-lg shadow-primary-500/30 shrink-0 transform hover:scale-105 active:scale-95">
                    <i className="fa-solid fa-paper-plane text-lg"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 fade-in">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-4 text-4xl transform rotate-3"><i className="fa-regular fa-comments"></i></div>
              <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Select a student to message</p>
              <p className="text-xs font-medium text-slate-300 mt-1 italic">Click on the left sidebar to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages;
