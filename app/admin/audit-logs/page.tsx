'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ShieldCheck, Loader2, RefreshCw, Activity } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
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
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
            System Audit Trail &amp; Security Logs
          </h1>
          <p className="text-xs text-[#6B4630] font-sans">
            Immutable audit records of administrative check-ins, check-outs, room blocks, price modifications, and cancellations.
          </p>
        </div>

        <button
          onClick={loadLogs}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#9B7049]/30 text-xs font-semibold text-[#3A2418] hover:bg-[#F1E8DA]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Audit Logs</span>
        </button>
      </div>

      <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 shadow-md">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-[#C7A15A] animate-spin mx-auto" />
            <p className="text-xs text-[#6B4630]">Loading audit trail...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#6B4630]">
            No audit records recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#9B7049]/20 text-[#9B7049] uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Entity Type</th>
                  <th className="py-3 px-3">Entity ID</th>
                  <th className="py-3 px-3">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#9B7049]/10 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F1E8DA]/30 font-medium">
                    <td className="py-3.5 px-3 text-[#6B4630] whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#F8F3E8] border border-[#9B7049]/30 text-[#3A2418] font-bold text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#6B4630] font-sans font-semibold">
                      {log.entity_type}
                    </td>
                    <td className="py-3.5 px-3 text-[#3A2418] font-bold font-mono">
                      {log.entity_id || '—'}
                    </td>
                    <td className="py-3.5 px-3 text-[#6B4630] max-w-sm truncate font-mono text-[10px]">
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
