
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Sample budget data
const budgetData = {
  total: 250000,
  spent: 120000,
  remaining: 130000,
  transactions: [
    { id: 1, date: '15/07/2023', description: 'Acompte initial', amount: -50000, type: 'payment' },
    { id: 2, date: '30/07/2023', description: 'Matériaux pour fondations', amount: 12500, type: 'expense' },
    { id: 3, date: '10/08/2023', description: 'Main d\'oeuvre fondations', amount: 18000, type: 'expense' },
    { id: 4, date: '25/08/2023', description: 'Validation étape fondations', amount: -75000, type: 'payment' },
    { id: 5, date: '05/09/2023', description: 'Matériaux pour murs', amount: 45000, type: 'expense' },
    { id: 6, date: '20/09/2023', description: 'Main d\'oeuvre murs', amount: 22000, type: 'expense' },
    { id: 7, date: '10/10/2023', description: 'Ajustement pour porte-fenêtre supplémentaire', amount: 3500, type: 'extra' },
  ]
};

const ClientAreaBudget = () => {
  // Calculate percentages
  const percentSpent = Math.round((budgetData.spent / budgetData.total) * 100);
  const percentRemaining = 100 - percentSpent;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Suivi budgétaire
        </CardTitle>
        <CardDescription>
          État actuel de votre budget et dernières transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-600 font-medium mb-1">Budget total</div>
              <div className="text-2xl font-bold">{budgetData.total.toLocaleString('fr-FR')} €</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-green-600 font-medium mb-1">Dépensé</div>
              <div className="text-2xl font-bold">{budgetData.spent.toLocaleString('fr-FR')} €</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="text-amber-600 font-medium mb-1">Restant</div>
              <div className="text-2xl font-bold">{budgetData.remaining.toLocaleString('fr-FR')} €</div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Progression budgétaire</div>
              <div className="text-sm">{percentSpent}% utilisé</div>
            </div>
            <Progress value={percentSpent} className="h-2" />
          </div>
          
          <h3 className="text-lg font-medium mb-4">Dernières transactions</h3>
          
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-right">Montant</th>
                  <th className="px-4 py-3 text-center">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {budgetData.transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">{transaction.date}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium">{transaction.description}</span>
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${
                      transaction.amount < 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount < 0 ? '-' : '+'}{Math.abs(transaction.amount).toLocaleString('fr-FR')} €
                    </td>
                    <td className="px-4 py-3 text-center">
                      {transaction.type === 'payment' && (
                        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Paiement
                        </span>
                      )}
                      {transaction.type === 'expense' && (
                        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Dépense
                        </span>
                      )}
                      {transaction.type === 'extra' && (
                        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Extra
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientAreaBudget;
