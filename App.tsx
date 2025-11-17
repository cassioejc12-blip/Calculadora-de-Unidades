import React, { useState } from 'react';
import type { CalculationResult } from './types';

// Helper component to display results, defined outside the main component
interface ResultDisplayProps {
  result: CalculationResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => (
  <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg animate-fade-in">
    <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Resultado do Cálculo</h2>
    <div className="space-y-3 text-gray-700">
      <div className="flex justify-between items-center">
        <span className="font-medium">Nome do Produto:</span>
        <span className="text-right font-semibold text-red-600">{result.productName}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Unidades Desejadas:</span>
        <span className="text-right">{result.totalUnits.toLocaleString('pt-BR')}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Unidades por Pacote:</span>
        <span className="text-right">{result.unitsPerPackage.toLocaleString('pt-BR')}</span>
      </div>
      <hr className="my-3 border-gray-300" />
      <div className="flex justify-between items-center text-lg">
        <span className="font-bold text-gray-800">Pacotes Necessários:</span>
        <span className="text-2xl font-extrabold text-red-700">{result.packagesNeeded.toLocaleString('pt-BR')}</span>
      </div>
    </div>
  </div>
);

export default function App() {
  const [productName, setProductName] = useState('');
  const [totalUnits, setTotalUnits] = useState('');
  const [unitsPerPackage, setUnitsPerPackage] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    if (!productName.trim() || !totalUnits || !unitsPerPackage) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const numTotalUnits = parseInt(totalUnits, 10);
    const numUnitsPerPackage = parseInt(unitsPerPackage, 10);

    if (isNaN(numTotalUnits) || isNaN(numUnitsPerPackage) || numTotalUnits <= 0 || numUnitsPerPackage <= 0) {
      setError('As quantidades devem ser números positivos maiores que zero.');
      return;
    }
    
    setError('');
    
    const packagesNeeded = Math.ceil(numTotalUnits / numUnitsPerPackage);
    
    setResult({
      productName: productName.trim(),
      totalUnits: numTotalUnits,
      unitsPerPackage: numUnitsPerPackage,
      packagesNeeded,
    });
  };

  const handleClear = () => {
    setProductName('');
    setTotalUnits('');
    setUnitsPerPackage('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 selection:bg-red-200 relative">
      <main className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex-shrink-0 border-t-4 border-red-600">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Calculadora de Unidades
          </h1>
          <p className="text-gray-500 mt-2">Coca-Cola FEMSA</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <div className="mt-1">
              <input
                id="productName"
                name="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Ex: Coca-Cola 2L"
              />
            </div>
          </div>

          <div>
            <label htmlFor="totalUnits" className="block text-sm font-medium text-gray-700">
              Quantidade total de unidades desejadas
            </label>
            <div className="mt-1">
              <input
                id="totalUnits"
                name="totalUnits"
                type="number"
                min="1"
                value={totalUnits}
                onChange={(e) => setTotalUnits(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Ex: 100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="unitsPerPackage" className="block text-sm font-medium text-gray-700">
              Quantidade de unidades por pacote/caixa
            </label>
            <div className="mt-1">
              <input
                id="unitsPerPackage"
                name="unitsPerPackage"
                type="number"
                min="1"
                value={unitsPerPackage}
                onChange={(e) => setUnitsPerPackage(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Ex: 6"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
            >
              Limpar
            </button>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
            >
              Calcular
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            <p className="font-medium text-center">{error}</p>
          </div>
        )}
        
        {result && <ResultDisplay result={result} />}
      </main>
      <footer className="absolute bottom-4 w-full text-center text-gray-500 text-sm">
        Software desenvolvido por Cassio Ferreira (©)
      </footer>
    </div>
  );
}
