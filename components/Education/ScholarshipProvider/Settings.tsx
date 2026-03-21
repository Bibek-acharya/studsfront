import React from 'react';

const Settings = () => {
  return (
    <section className="fade-in max-w-4xl mx-auto pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-800">System Preferences</h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">Configure your dashboard experience and security settings.</p>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-lg font-black border-b border-slate-100 pb-4 mb-8 text-slate-800 uppercase tracking-tighter">Notification Settings</h3>
          <div className="space-y-6 max-w-2xl">
            {[
              { title: 'New Application Alerts', desc: 'Receive an email when a new student applies.', checked: true },
              { title: 'Daily Digest Summary', desc: 'A daily email summarizing all activities.', checked: false },
              { title: 'Chat Message Notifications', desc: 'Alerts for unread messages from students.', checked: true },
              { title: 'Interview Reminders', desc: 'Notify 1 hour before scheduled interviews.', checked: true }
            ].map(setting => (
              <div key={setting.title} className="flex items-center justify-between group">
                <div>
                  <p className="font-bold text-slate-700 group-hover:text-primary-600 transition-colors">{setting.title}</p>
                  <p className="text-xs text-slate-400 font-medium">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer scale-110">
                  <input type="checkbox" defaultChecked={setting.checked} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 shadow-inner"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-lg font-black border-b border-slate-100 pb-4 mb-8 text-slate-800 uppercase tracking-tighter">Security & Access</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm flex items-center gap-2">
              <i className="fa-solid fa-key text-slate-400"></i> Change Password
            </button>
            <button className="px-6 py-3 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-slate-400"></i> Enable 2FA
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-3xl shadow-sm border border-red-100 p-8">
          <h3 className="text-lg font-black border-b border-red-200 pb-4 mb-6 text-red-800 uppercase tracking-tighter">Danger Zone</h3>
          <p className="text-sm text-red-600 mb-6 font-medium">Once you delete your organization data, it cannot be undone. Please be certain.</p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition shadow-lg shadow-red-500/20">
            Deactivate Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
