import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const PropertyTransactionsModal = ({ propertyId, propertyAddress, onClose, open }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (propertyId) fetchTransactions();
    // eslint-disable-next-line
  }, [propertyId]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/properties/${propertyId}/transactions`);
      setTransactions(res.data || []);
      setTotal(res.data.reduce((sum, tx) => sum + (tx.amount || 0), 0));
    } catch (e) {
      setTransactions([]);
      setTotal(0);
    }
    setLoading(false);
  };

  if (!propertyId || !open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-4">Transactions for {propertyAddress}</h2>
        {loading ? <p>Loading...</p> : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">For Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.tenantName}</td>
                    <td>{tx.type}</td>
                    <td>{tx.forMonth}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.transactionDate}</td>
                    <td>{tx.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-bold text-gray-800">
            Total Balance: <span className={total < 0 ? 'text-red-600' : 'text-green-600'}>{total}</span>
          </div>
          <button className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

PropertyTransactionsModal.propTypes = {
  propertyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  propertyAddress: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PropertyTransactionsModal;
