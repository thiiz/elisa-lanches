"use client";

import { Database, X } from "lucide-react";
import { Order } from "../../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const AdminPanel = ({ isOpen, onClose, orders }: AdminPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="flex h-[80vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
        <div className="flex items-center justify-between border-b border-stone-200 p-6 dark:border-slate-700">
          <h2 className="flex items-center gap-2 text-2xl font-bold dark:text-white">
            <Database className="text-orange-500" /> Banco de Dados (Pedidos)
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-stone-100 dark:hover:bg-slate-700 dark:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {orders.length === 0 ? (
            <div className="text-center text-slate-500">
              Nenhum pedido registrado no banco de dados local.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="rounded-l-lg p-3">Data/Hora</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Itens</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-700">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-stone-50 dark:hover:bg-slate-700/50"
                    >
                      <td className="p-3 font-mono text-xs dark:text-slate-400">
                        {new Date(order.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3 font-bold dark:text-white">
                        {order.customer.name}
                      </td>
                      <td className="p-3 dark:text-slate-300">
                        {order.items.length} itens
                      </td>
                      <td className="p-3 font-bold text-orange-500">
                        {order.total}
                      </td>
                      <td className="p-3">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
