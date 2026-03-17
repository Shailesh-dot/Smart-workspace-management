"use client";
import React, { useState } from "react";
import Image from "next/image";
import { 
  User, 
  Building2, 
  Bell, 
  ShieldCheck, 
  Globe, 
  Palette, 
  Save,
  ChevronRight,
  Camera,
  Calendar,
  Settings as SettingsIcon
} from "lucide-react";
import { useTheme } from "../../../../ThemeContext";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { theme: globalTheme, setTheme: setGlobalTheme, accentColor: globalAccent, setAccentColor: setGlobalAccent } = useTheme();
  
  const [profileData, setProfileData] = useState({
    name: "Prasanth S",
    email: "prasanth.2312s@gmail.com",
    role: "System Administrator",
    phone: "+91 98765 43210",
    avatar: "https://i.pravatar.cc/150?u=admin"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingOrg, setIsSavingOrg] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);
  const [isSavingRegion, setIsSavingRegion] = useState(false);
  const [isSavingDisplay, setIsSavingDisplay] = useState(false);

  const [orgData, setOrgData] = useState({
    name: "SmartFlow Solutions",
    industry: "Information Technology",
    description: "Leading provider of AI-driven workforce management and upskilling solutions for modern enterprises."
  });

  const [notificationSettings, setNotificationSettings] = useState({
    onboarding: true,
    reports: false,
    security: true
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [regionSettings, setRegionSettings] = useState({
    language: "English (US)",
    timezone: "(GMT-08:00) Pacific Time",
    dob: ""
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: globalTheme,
    accentColor: globalAccent
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type } as any);
    setTimeout(() => setNotification(null), 3000);
  };

  const sections = [
    { id: "profile", icon: User, label: "Profile Information" },
    { id: "organization", icon: Building2, label: "Organization" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "security", icon: ShieldCheck, label: "Security" },
    { id: "language", icon: Globe, label: "Language & Region" },
    { id: "display", icon: Palette, label: "Display & Theme" },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotification("File size exceeds 2MB limit.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result as string });
        showNotification("Avatar preview updated. Save changes to persist.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      showNotification("Profile updated successfully!");
    }, 1000);
  };

  const handleRemoveAvatar = () => {
    setProfileData({ ...profileData, avatar: "https://i.pravatar.cc/150?u=placeholder" });
    showNotification("Avatar removed. Save changes to persist.");
  };

  const handleSaveOrg = () => {
    setIsSavingOrg(true);
    // Simulate API call
    setTimeout(() => {
      setIsSavingOrg(false);
      showNotification("Organization details updated successfully!");
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsSavingNotifications(true);
    setTimeout(() => {
      setIsSavingNotifications(false);
      showNotification("Notification preferences saved!");
    }, 1000);
  };

  const handleSaveSecurity = () => {
    if (!securityData.currentPassword) {
      showNotification("Please enter your current password.", "error");
      return;
    }
    if (securityData.newPassword !== securityData.confirmPassword) {
      showNotification("New passwords do not match!", "error");
      return;
    }
    if (securityData.newPassword.length < 8) {
      showNotification("Password must be at least 8 characters.", "error");
      return;
    }
    setIsSavingSecurity(true);
    setTimeout(() => {
      setIsSavingSecurity(false);
      setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showNotification("Security settings updated!");
    }, 1000);
  };

  const handleSaveRegion = () => {
    setIsSavingRegion(true);
    setTimeout(() => {
      setIsSavingRegion(false);
      showNotification("Region settings saved!");
    }, 1000);
  };

  const handleSaveDisplay = () => {
    setIsSavingDisplay(true);
    setTimeout(() => {
      setGlobalTheme(displaySettings.theme);
      setGlobalAccent(displaySettings.accentColor);
      setIsSavingDisplay(false);
      showNotification("Display theme applied!");
    }, 1000);
  };

  return (
    <div className="w-full">
      <header className="mb-8">
        <div className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Administrator</div>
        <h1 className={`text-3xl font-display font-bold transition-colors ${
          globalTheme === "dark" ? "text-white" : "text-zinc-900"
        }`}>Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your account preferences and system configurations.</p>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? (globalTheme === "dark" ? "bg-zinc-900 text-accent border border-zinc-800 font-bold" : "bg-accent-muted text-accent border border-accent-muted font-bold")
                  : "text-zinc-500 hover:text-accent hover:bg-accent-muted/50"
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`lg:col-span-3 border rounded-3xl p-8 shadow-sm transition-all duration-300 relative ${
          globalTheme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-accent-muted"
        }`}>
          {/* Notification Toast */}
          {notification && (
            <div className={`absolute top-4 right-8 z-50 px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-2 ${
              notification.type === "error" 
                ? "bg-red-500 text-white" 
                : "bg-emerald-500 text-white"
            }`}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-bold">{notification.message}</span>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="relative w-24 h-24">
                    <Image 
                      src={profileData.avatar} 
                      fill
                      className={`rounded-2xl border-2 object-cover transition-colors ${
                        globalTheme === "dark" ? "border-zinc-800" : "border-sky-100"
                      }`} 
                      alt="Admin Avatar" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <label className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white w-6 h-6" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                <div>
                  <h3 className={`text-lg font-bold transition-colors ${
                    globalTheme === "dark" ? "text-white" : "text-zinc-900"
                  }`}>Profile Picture</h3>
                  <p className="text-zinc-400 text-sm">JPG, GIF or PNG. Max size of 2MB.</p>
                  <div className="flex gap-3 mt-3">
                    <label className="text-accent text-sm font-bold hover:underline cursor-pointer">
                      Upload New
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                    <button 
                      onClick={handleRemoveAvatar}
                      className="text-red-500 text-sm font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Full Name</label>
                  <input 
                    type="text" 
                    value={profileData.name} 
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                      globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Email Address</label>
                  <input 
                    type="email" 
                    value={profileData.email} 
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                      globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Role</label>
                  <input 
                    type="text" 
                    value={profileData.role} 
                    disabled
                    className={`w-full border rounded-xl px-4 py-3 cursor-not-allowed ${
                      globalTheme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-zinc-50 border-zinc-100 text-zinc-400"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Phone Number</label>
                  <input 
                    type="tel" 
                    value={profileData.phone} 
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+91 98765 43210" 
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                      globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                    }`}
                  />
                </div>
              </div>

              <div className={`pt-6 border-t flex justify-end gap-4 ${
                globalTheme === "dark" ? "border-zinc-800" : "border-sky-50"
              }`}>
                <button 
                  onClick={() => {
                    setProfileData({
                      name: "Prasanth S",
                      email: "prasanth.2312s@gmail.com",
                      role: "System Administrator",
                      phone: "+91 98765 43210",
                      avatar: "https://i.pravatar.cc/150?u=admin"
                    });
                    showNotification("Changes discarded", "info");
                  }}
                  className="px-6 py-2 text-zinc-500 font-bold hover:text-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="px-6 py-2 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {activeSection === "organization" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Company Name</label>
                  <input 
                    type="text" 
                    value={orgData.name} 
                    onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                      globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Industry</label>
                  <select 
                    value={orgData.industry}
                    onChange={(e) => setOrgData({ ...orgData, industry: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all appearance-none ${
                      globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                    }`}
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-sm font-bold transition-colors ${
                  globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                }`}>Company Description</label>
                <textarea 
                  rows={4}
                  value={orgData.description}
                  onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                    globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                  }`}
                />
              </div>
              <div className={`pt-6 border-t flex justify-end ${
                globalTheme === "dark" ? "border-zinc-800" : "border-sky-50"
              }`}>
                <button 
                  onClick={handleSaveOrg}
                  disabled={isSavingOrg}
                  className="px-6 py-2 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingOrg ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSavingOrg ? "Updating..." : "Update Organization"}
                </button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-6">
                <h3 className={`text-lg font-bold border-b pb-2 transition-colors ${
                  globalTheme === "dark" ? "text-white border-zinc-800" : "text-zinc-900 border-sky-50"
                }`}>Email Notifications</h3>
                {[
                  { id: "onboarding", label: "New Employee Onboarding", desc: "Get notified when a new employee joins the platform." },
                  { id: "reports", label: "Performance Reports", desc: "Receive weekly summaries of workforce performance." },
                  { id: "security", label: "Security Alerts", desc: "Critical alerts regarding account security and access." },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <div className={`font-bold transition-colors ${
                        globalTheme === "dark" ? "text-zinc-300" : "text-zinc-700"
                      }`}>{item.label}</div>
                      <div className="text-xs text-zinc-400">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings[item.id]} 
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          [item.id]: !notificationSettings[item.id]
                        })}
                      />
                      <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white ${
                        globalTheme === "dark" ? "bg-zinc-800 after:border-zinc-600 peer-checked:bg-accent" : "bg-zinc-200 after:border-zinc-300 peer-checked:bg-accent"
                      }`}></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className={`pt-6 border-t flex justify-end ${
                globalTheme === "dark" ? "border-zinc-800" : "border-sky-50"
              }`}>
                <button 
                  onClick={handleSaveNotifications}
                  disabled={isSavingNotifications}
                  className="px-6 py-2 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingNotifications ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSavingNotifications ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-6">
                <h3 className={`text-lg font-bold border-b pb-2 transition-colors ${
                  globalTheme === "dark" ? "text-white border-zinc-800" : "text-zinc-900 border-sky-50"
                }`}>Change Password</h3>
                <div className="grid gap-4 max-w-md">
                  <div className="space-y-2">
                    <label className={`text-sm font-bold transition-colors ${
                      globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                    }`}>Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                        globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                      }`} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-bold transition-colors ${
                      globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                    }`}>New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                        globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                      }`} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-bold transition-colors ${
                      globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                    }`}>Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                        globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                      }`} 
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className={`text-lg font-bold border-b pb-2 transition-colors ${
                  globalTheme === "dark" ? "text-white border-zinc-800" : "text-zinc-900 border-sky-50"
                }`}>Two-Factor Authentication</h3>
                <div className={`flex items-center justify-between p-4 border rounded-2xl transition-colors ${
                  globalTheme === "dark" ? "bg-zinc-950 border-zinc-800" : "bg-sky-50/30 border-sky-100"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      globalTheme === "dark" ? "bg-zinc-900 text-accent" : "bg-sky-100 text-sky-600"
                    }`}>
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`font-bold transition-colors ${
                        globalTheme === "dark" ? "text-zinc-300" : "text-zinc-700"
                      }`}>Authenticator App</div>
                      <div className="text-xs text-zinc-400">Use an app like Google Authenticator to secure your account.</div>
                    </div>
                  </div>
                  <button className={`px-4 py-2 border rounded-xl text-sm font-bold transition-all ${
                    globalTheme === "dark" ? "bg-zinc-900 border-zinc-800 text-accent hover:bg-zinc-800" : "bg-white border-sky-100 text-sky-600 hover:bg-sky-50"
                  }`}>
                    Enable
                  </button>
                </div>
              </div>
              <div className={`pt-6 border-t flex justify-end ${
                globalTheme === "dark" ? "border-zinc-800" : "border-sky-50"
              }`}>
                <button 
                  onClick={handleSaveSecurity}
                  disabled={isSavingSecurity}
                  className="px-6 py-2 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingSecurity ? "Updating..." : "Update Security"}
                </button>
              </div>
            </div>
          )}

          {activeSection === "language" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Preferred Language</label>
                  <select 
                    value={regionSettings.language}
                    onChange={(e) => setRegionSettings({...regionSettings, language: e.target.value})}
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all appearance-none ${
                      globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                    }`}
                  >
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Timezone</label>
                  <select 
                    value={regionSettings.timezone}
                    onChange={(e) => setRegionSettings({...regionSettings, timezone: e.target.value})}
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all appearance-none ${
                      globalTheme === "dark" ? "bg-zinc-950 border-zinc-800 text-white focus:border-accent" : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500"
                    }`}
                  >
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT+00:00) UTC</option>
                    <option>(GMT+05:30) India Standard Time</option>
                    <option>(GMT+01:00) Central European Time</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-bold transition-colors ${
                    globalTheme === "dark" ? "text-zinc-400" : "text-zinc-700"
                  }`}>Date of Birth</label>
                  <div className="relative group">
                    <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors pointer-events-none z-10 ${
                      globalTheme === "dark" ? "text-zinc-500 group-focus-within:text-accent" : "text-zinc-400 group-focus-within:text-sky-500"
                    }`} />
                    {!regionSettings.dob && (
                      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none z-0">
                        DD-MM-YYYY
                      </span>
                    )}
                    <input 
                      type="date" 
                      value={regionSettings.dob}
                      onChange={(e) => setRegionSettings({...regionSettings, dob: e.target.value})}
                      className={`w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none transition-all shadow-sm hover:shadow-md relative z-5 cursor-pointer hide-default-date ${
                        regionSettings.dob ? "has-value" : ""
                      } ${
                        globalTheme === "dark" 
                          ? "bg-zinc-950/50 border-zinc-800 text-white focus:border-accent focus:ring-4 focus:ring-accent/10 focus:bg-zinc-950" 
                          : "bg-sky-50/30 border-sky-100 text-zinc-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:bg-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className={`pt-6 border-t flex justify-end ${
                globalTheme === "dark" ? "border-zinc-800" : "border-sky-50"
              }`}>
                <button 
                  onClick={handleSaveRegion}
                  disabled={isSavingRegion}
                  className="px-6 py-2 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingRegion ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSavingRegion ? "Saving..." : "Save Region Settings"}
                </button>
              </div>
            </div>
          )}

          {activeSection === "display" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-6">
                <h3 className={`text-lg font-bold border-b pb-2 transition-colors ${
                  globalTheme === "dark" ? "text-white border-zinc-800" : "text-zinc-900 border-sky-50"
                }`}>Interface Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "light", label: "Light", color: "bg-white" },
                    { id: "dark", label: "Dark", color: "bg-zinc-900" },
                    { id: "system", label: "System", color: "bg-gradient-to-br from-white to-zinc-900" },
                  ].map((theme) => (
                    <button 
                      key={theme.id} 
                      onClick={() => setDisplaySettings({...displaySettings, theme: theme.id})}
                      className="group flex flex-col gap-2"
                    >
                      <div className={`w-full aspect-video rounded-xl border-2 transition-all ${theme.color} shadow-sm ${
                        displaySettings.theme === theme.id ? "border-accent ring-2 ring-accent/20" : (globalTheme === "dark" ? "border-zinc-800 group-hover:border-zinc-700" : "border-sky-100 group-hover:border-sky-300")
                      }`} />
                      <span className={`text-sm font-bold transition-colors ${displaySettings.theme === theme.id ? "text-accent" : "text-zinc-600"}`}>{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className={`text-lg font-bold border-b pb-2 transition-colors ${
                  globalTheme === "dark" ? "text-white border-zinc-800" : "text-zinc-900 border-sky-50"
                }`}>Accent Color</h3>
                <div className="flex gap-4">
                  {["bg-sky-500", "bg-indigo-500", "bg-emerald-500", "bg-orange-500", "bg-rose-500"].map((color) => (
                    <button 
                      key={color} 
                      onClick={() => setDisplaySettings({...displaySettings, accentColor: color})}
                      className={`w-8 h-8 rounded-full ${color} ${displaySettings.accentColor === color ? "ring-4 ring-accent/20 scale-110" : ""} hover:scale-110 transition-all`} 
                    />
                  ))}
                </div>
              </div>
              <div className={`pt-6 border-t flex justify-end ${
                globalTheme === "dark" ? "border-zinc-800" : "border-sky-50"
              }`}>
                <button 
                  onClick={handleSaveDisplay}
                  disabled={isSavingDisplay}
                  className="px-6 py-2 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingDisplay ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSavingDisplay ? "Applying..." : "Apply Theme"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
