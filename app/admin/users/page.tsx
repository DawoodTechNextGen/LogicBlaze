'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Shield, UserX, UserCheck, Trash2, Mail, Lock, Key } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Blocked';
  lastActive: string;
}

export default function AdminUsersPage(): JSX.Element {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Editor');
  
  // Load users from localStorage on mount, set defaults if empty
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('admin_users_list');
      if (storedUsers) {
        try {
          setUsers(JSON.parse(storedUsers));
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaultUsers: AdminUser[] = [
          {
            id: '1',
            name: 'System Admin',
            email: 'admin@logicblaze.com',
            role: 'Administrator',
            status: 'Active',
            lastActive: 'Just now'
          },
          {
            id: '2',
            name: 'Sarah Jenkins',
            email: 'sarah.j@logicblaze.com',
            role: 'SEO Manager',
            status: 'Active',
            lastActive: '2 hours ago'
          },
          {
            id: '3',
            name: 'David Miller',
            email: 'david.m@logicblaze.com',
            role: 'Editor',
            status: 'Blocked',
            lastActive: '3 days ago'
          }
        ];
        setUsers(defaultUsers);
        localStorage.setItem('admin_users_list', JSON.stringify(defaultUsers));
      }
    }
  }, []);

  const saveUsersToStorage = (updatedUsers: AdminUser[]) => {
    setUsers(updatedUsers);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_users_list', JSON.stringify(updatedUsers));
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: AdminUser = {
      id: `user-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      lastActive: 'Never'
    };

    const updated = [...users, newUser];
    saveUsersToStorage(updated);
    
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('Editor');
  };

  const toggleUserStatus = (id: string) => {
    // Avoid blocking the main admin
    if (id === '1') {
      alert("System Administrator status cannot be toggled.");
      return;
    }
    const updated = users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? ('Blocked' as const) : ('Active' as const) };
      }
      return u;
    });
    saveUsersToStorage(updated);
  };

  const handleDeleteUser = (id: string) => {
    if (id === '1') {
      alert("System Administrator cannot be deleted.");
      return;
    }
    if (confirm("Are you sure you want to remove this user?")) {
      const updated = users.filter(u => u.id !== id);
      saveUsersToStorage(updated);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--logo-deep-navy)', marginBottom: '4px' }}>
          User & Permission Control Center
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Add teammates, manage roles, block access, and audit administrator activity.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left: Users List Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="var(--logo-royal-blue)" />
            Active Team Workspace
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', fontSize: '12px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>User Details</th>
                <th style={{ padding: '12px 16px' }}>Role</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Last Session</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '14px' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Mail size={12} /> {user.email}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      padding: '4px 10px', 
                      background: user.role === 'Administrator' ? '#EEF2FF' : '#F1F5F9', 
                      color: user.role === 'Administrator' ? '#4F46E5' : '#475569', 
                      borderRadius: '99px',
                      border: user.role === 'Administrator' ? '1px solid #C7D2FE' : '1px solid #E2E8F0'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      padding: '4px 10px', 
                      borderRadius: '99px',
                      background: user.status === 'Active' ? '#DCFCE7' : '#FEE2E2',
                      color: user.status === 'Active' ? '#15803D' : '#991B1B'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#64748B', fontSize: '13px' }}>
                    {user.lastActive}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      {/* Toggle status btn */}
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        title={user.status === 'Active' ? 'Block user access' : 'Activate user access'}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: user.status === 'Active' ? '#EF4444' : '#22C55E',
                          padding: '6px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: user.status === 'Active' ? '#FCA5A5' : '#86EFAC'
                        }}
                      >
                        {user.status === 'Active' ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                      {/* Delete user btn */}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        title="Remove user"
                        style={{
                          background: 'none',
                          border: '1px solid #FCA5A5',
                          cursor: 'pointer',
                          color: '#EF4444',
                          padding: '6px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Add New User Form */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="var(--logo-royal-blue)" />
            Add Team Member
          </h3>

          <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Full Name:
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontSize: '14px',
                  background: '#F8FAFC'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Email Address:
              </label>
              <input
                type="email"
                placeholder="e.g. john@logicblaze.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontSize: '14px',
                  background: '#F8FAFC'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Access Level / Role:
              </label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontSize: '14px',
                  background: '#F8FAFC'
                }}
              >
                <option value="Administrator">Administrator</option>
                <option value="SEO Manager">SEO Manager</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                marginTop: '8px'
              }}
            >
              <Plus size={16} />
              <span>Create User Account</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
