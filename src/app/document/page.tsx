'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

// New component to contain the logic using useSearchParams
function DocumentContent() {
  const searchParams = useSearchParams();
  
  const scopeOfWork = searchParams.get('scope') || 'Not provided';
  const contactInfo = {
    name: searchParams.get('name') || 'Friend',
    address: searchParams.get('address') || 'Not provided',
    phone: searchParams.get('phone') || 'Not provided',
    email: searchParams.get('email') || 'Not provided'
  };
  const timeline = searchParams.get('timeline') || 'Not provided';
  const budget = searchParams.get('budget') || 'Not provided';
  const downPayment = searchParams.get('downPayment') || '50';
  const terms = searchParams.get('terms') || 'All work will be performed in a professional and timely manner in accordance with local building codes and industry standards. This estimate is valid for 30 days from the date of issue. A deposit may be required prior to scheduling work, with the remaining balance due upon completion. Any unforeseen conditions or changes to the scope of work may result in additional charges, which will be communicated and approved in writing prior to proceeding. The customer is responsible for providing clear access to the work area and for removing any personal items from the vicinity. We are fully insured and licensed, and all workmanship is covered by a 1-year limited labor warranty. Materials are subject to the manufacturer’s warranty.';
  const currentDate = format(new Date(), 'MM/dd/yyyy');

  const firstName = contactInfo.name.split(" ")[0] || 'Prospective Customer';

  // Extract numbers from budget text
  const extractAmounts = (text: string) => {
    const matches = text.match(/\$?([\d,]+(?:\.\d{2})?)/g) || [];
    return matches.map(match => parseFloat(match.replace(/[$,]/g, '')));
  };

  const amounts = extractAmounts(budget);
  const total = amounts.reduce((sum, amount) => sum + amount, 0);
  const downPaymentAmount = (total * (parseInt(downPayment) / 100));

  // Format budget lines for display
  const budgetLines = budget.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <div className="max-w-[8.5in] mx-auto bg-white shadow-lg">
    <div className="mb-2 p-6">
        <h1 className="text-4xl font-bold text-black"><span className="block text-sm font-light font-normal text-gray-500 mb-1">Proposal of work for</span> {contactInfo.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{contactInfo.address} • {contactInfo.phone} • {contactInfo.email}</p>
        <p className="text-sm text-gray-700 mt-3">{currentDate}</p>
      </div>

      <header className="block pt-[60px]" 
        style={{
          backgroundImage: 'url("https://images.airtasker.com/v7/https://airtasker-seo-assets-prod.s3.amazonaws.com/en_AU/1662702282928_best-handyman-tools.jpg?w=1328&func=bound&org_if_sml=1")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>




      {/* <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Customer</h3>
          <div className="text-sm">
            <p>{contactInfo.name}</p>
            <p>{contactInfo.address}</p>
            <p>Phone Number: {contactInfo.phone}</p>
            <p>Email: {contactInfo.email}</p>
          </div>
        </div>
      </div> */}

      <div className="px-8 py-10 pt-12 flex justify-end" style={{transform: 'translate3d(0, 15%, 0)'}}>
        <p className="text-lg font-normal bg-white p-6 rounded-lg max-w-[500px] shadow-lg" style={{fontFamily: `'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive`, transform: 'rotate(5deg)'}}>
      <span className="block mb-4">👋&nbsp; {firstName},</span>{scopeOfWork} <span className="block mt-2">Eric & the Custom Construction Crew</span></p>
      </div>
      </header>
      <div className="text-sm font-normal text-gray-500 bg-gray-100 text-center rounded-md mt-10 mx-8 py-4">
            Eric Schmidt • Custom Construction Co. • 350 Builder Street, Suite 220, Construction City, ST 12345 • info@customconstruction.com
          </div>
      <div className="p-8">

      {/* <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Scope of Work</h2>
        <div className="text-sm">
          {scopeOfWork.split('\n').map((line, index) => (
            <p key={index} className="mb-2 flex items-start">
              <span>{line}</span>
            </p>
          ))}
        </div>
      </div> */}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Timeline</h2>
        <div className="text-sm whitespace-pre-wrap">{timeline}</div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Price Breakdown</h2>
        <p className="text-sm mb-4 text-gray-600">Line items and amounts are all generated. Audit and adjust totals before sharing.</p>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Description</th>
                <th className="px-4 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {budgetLines.map((line, i) => {
                const amount = amounts[i] || 0;
                return (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2">{line}</td>
                    <td className="px-4 py-2 text-right">${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 font-medium">
              <tr>
                <td className="px-4 py-2 text-right">Total:</td>
                <td className="px-4 py-2 text-right">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <p className="text-sm">
          To start work, we will need a {downPayment}% deposit (${downPaymentAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}). 
          The remainder (${(total - downPaymentAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}) will be paid when the work has been completed to your satisfaction.
        </p>
        <button type="button" className="bg-blue-600 text-white p-4 rounded-lg block mt-4 font-bold" style={{width: '100%'}}>Pay ${(total - downPaymentAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</button>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
        <div className="text-sm whitespace-pre-wrap">{terms}</div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t">
        <div>
          <p className="font-medium mb-8">Client Signature:</p>
          <div className="border-b border-dashed w-48"></div>
          <p className="text-sm text-gray-600 mt-2">Date</p>
        </div>
        <div>
          <p className="font-medium mb-8">Contractor Signature:</p>
          <div className="border-b border-dashed w-48"></div>
          <p className="text-sm text-gray-600 mt-2">Date</p>
        </div>
      </div>
      </div>
    </div>
  );
}

// Default export component wraps DocumentContent in Suspense
export default function DocumentPage() {
  return (
    <Suspense fallback={<div>Loading document...</div>}>
      <DocumentContent />
    </Suspense>
  );
}