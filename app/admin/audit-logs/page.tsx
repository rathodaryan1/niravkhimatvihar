'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const token = localStorage.getItem('nkv_admin_token') || '';
        const res = await fetch('/api/admin/audit-logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) {
          setLogs(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
          System Audit Trail & Security Logs
        </h1>
        <p className="text-xs text-text-secondary">
          Immutable audit records of administrative actions, room blocks, price modifications, and cancellations.
        </p>
      </div>

      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-3xl p-6 shadow-card">
        {loading ? (
          <div className="py-12 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-brand-gold animate-spin mx-auto" />
            <p className="text-xs text-text-secondary">Loading audit trail...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted">
            No audit records recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-sandstone/20 text-brand-sandstone uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Entity Type</th>
                  <th className="py-3 px-3">Entity ID</th>
                  <th className="py-3 px-3">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sandstone/10 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-brand-lightSand/30 font-medium">
                    <td className="py-3 px-3 text-text-muted whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-brand-lightSand border border-brand-sandstone/30 text-brand-deep font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-secondary">{log.entity_type}</td>
                    <td className="py-3 px-3 text-brand-deep">{log.entity_id || '—'}</td>
                    <td className="py-3 px-3 text-text-secondary max-w-xs truncate">
                      {log.metadata ? JSON.stringify(log.metadata) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
