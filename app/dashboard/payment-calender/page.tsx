"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';

const calculateRepaymentSchedule = (
  loanAmount: string, 
  loanTermMonths: string, 
  monthlyInterestRatePercent = 3.0
) => {
  const amount = parseFloat(loanAmount);
  const termMonths = parseInt(loanTermMonths);
  const monthlyRate = monthlyInterestRatePercent / 100;
  
  if (isNaN(amount) || isNaN(termMonths) || amount <= 0 || termMonths <= 0) {
    return [];
  }

  let balance = amount;
  const schedule = [];
  const startDate = new Date();
  
  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    const principal = (amount / termMonths);
    const payment = principal + interest;
    balance -= principal;

    schedule.push({
      month,
      date: new Date(startDate.setMonth(startDate.getMonth() + 1)),
      principal,
      interest,
      payment,
      balance: balance > 0 ? balance : 0
    });
  }

  return schedule;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export default function AmortizationTable() {
  const params = useSearchParams();
  const amount = params.get('loanAmount') || '100000';
  const term = params.get('loanTermMonths') || '12';
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    setSchedule(calculateRepaymentSchedule(amount, term));
  }, [amount, term]);

  const handleExport = () => {
    const headers = ['Mois', 'Date', 'Principal', 'Intérêt', 'Mensualité', 'Reste dû'];
    const csv = [
      headers.join(','),
      ...schedule.map(p => [
        p.month,
        formatDate(p.date),
        formatCurrency(p.principal),
        formatCurrency(p.interest),
        formatCurrency(p.payment),
        formatCurrency(p.balance)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `amortissement-${amount}-${term}mois.csv`;
    link.click();
  };

  const monthlyPayment = schedule[0]?.payment || 0;
  const totalInterest = schedule.reduce((sum, p) => sum + p.interest, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <Head>
        <title>Tableau d'amortissement</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header Section */}
      <header className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Tableau d'amortissement
        </h1>
        
        {/* Summary Cards - Stack on mobile, row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 sm:mb-6">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500">Montant</p>
            <p className="text-lg sm:text-xl font-semibold">
              {formatCurrency(parseFloat(amount))} BIF
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500">Durée</p>
            <p className="text-lg sm:text-xl font-semibold">{term} mois</p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500">Mensualité</p>
            <p className="text-lg sm:text-xl font-semibold text-primary">
              {formatCurrency(monthlyPayment)} BIF
            </p>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500">Coût total</p>
            <p className="text-lg sm:text-xl font-semibold">
              {formatCurrency(parseFloat(amount) + totalInterest)} BIF
            </p>
          </div>
        </div>

        {/* Export Button - Full width on mobile, auto width on desktop */}
        <button
          onClick={handleExport}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exporter en CSV
        </button>
      </header>

      {/* Main Table Section */}
      <section className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Table Container with Responsive Breakpoints */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Mois
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Principal
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Intérêt
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Mensualité
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Reste dû
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedule.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    {payment.month}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                    {formatCurrency(payment.principal)}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-yellow-600 text-right">
                    {formatCurrency(payment.interest)}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-primary font-medium text-right">
                    {formatCurrency(payment.payment)}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                    {formatCurrency(payment.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {schedule.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm sm:text-base font-medium text-gray-900">Aucune donnée disponible</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Veuillez vérifier les paramètres du prêt
            </p>
          </div>
        )}
      </section>

      {/* Mobile-Friendly Alternative for Small Screens */}
      <div className="lg:hidden mt-6 space-y-3">
        {schedule.slice(0, 3).map((payment) => (
          <div key={payment.month} className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Mois {payment.month}</h3>
                <p className="text-xs text-gray-500">{formatDate(payment.date)}</p>
              </div>
              <span className="text-sm font-medium text-primary">
                {formatCurrency(payment.payment)} BIF
              </span>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500">Principal</p>
                <p>{formatCurrency(payment.principal)} BIF</p>
              </div>
              <div>
                <p className="text-gray-500">Intérêt</p>
                <p className="text-yellow-600">{formatCurrency(payment.interest)} BIF</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Reste dû</p>
                <p>{formatCurrency(payment.balance)} BIF</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* {schedule.length > 3 && (
          <button className="w-full py-2 text-sm text-primary font-medium">
            Voir les {schedule.length - 3} échéances supplémentaires
          </button>
        )} */}
      </div>
    </div>
  );
}