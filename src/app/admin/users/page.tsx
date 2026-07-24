'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Trash2,
  Shield,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Plus,
  X,
  Save
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Co-Founder');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (e) {}
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');

      setSuccessMessage(`New Admin user "${name}" added successfully with Bcrypt hashed password!`);
      setName('');
      setEmail('');
      setPassword('');
      setRole('Co-Founder');
      setIsAdding(false);
      fetchUsers();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string, userName: string) => {
    if (confirm(`Are you sure you want to remove admin access for ${userName}?`)) {
      try {
        const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to delete');

        setSuccessMessage(`User "${userName}" access revoked.`);
        fetchUsers();
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-[#3B82F6]" />
            User Management & Admin Access Control
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Add CTOs, Co-Founders & Executives to manage LogicBlaze Admin. Passwords are salted & bcrypt-hashed in MySQL DB.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-neon px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            Add New Admin User
          </button>
        )}
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {successMessage}
        </div>
      )}

      {/* Add New Admin Form */}
      {isAdding && (
        <form onSubmit={handleAddUser} className="bg-[#0c0f15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#3B82F6]" />
              Grant Admin Access to Team Member
            </h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@logicblaze.co"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Password * (Will be Bcrypt Hashed)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Designated Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="Co-Founder" className="bg-black">Co-Founder</option>
                <option value="CTO & VP Engineering" className="bg-black">CTO & VP Engineering</option>
                <option value="Product Manager" className="bg-black">Product Manager</option>
                <option value="SEO Lead" className="bg-black">SEO & Analytics Lead</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-neon px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save & Create Admin
            </button>
          </div>
        </form>
      )}

      {/* Users Table / Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#3B82F6]" />
          Authorized Admin Accounts ({users.length})
        </h2>

        <div className="bg-glass-card rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase font-bold text-gray-400 bg-white/5">
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                      <Shield className="w-4 h-4" />
                    </div>
                    {u.name}
                  </td>
                  <td className="p-4 font-mono text-gray-300">{u.email}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] font-semibold text-[11px] border border-[#3B82F6]/30">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {u.id !== '1' ? (
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className="p-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60 transition-colors"
                        title="Revoke Admin Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-gray-500 font-mono italic">Primary Super Admin</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
