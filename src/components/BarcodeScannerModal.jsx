import React, { useState } from 'react';
import { X, Camera, Scan, CheckCircle2, AlertCircle, Volume2 } from 'lucide-react';

export default function BarcodeScannerModal({ isOpen, onClose, products, onSelectScannedProduct }) {
  const [manualBarcode, setManualBarcode] = useState('');
  const [scannedResult, setScannedResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const sampleBarcodes = [
    { code: '8901262010015', name: 'Amul Milk 500ml', icon: '🥛' },
    { code: '8901063001021', name: 'Britannia Bread 400g', icon: '🍞' },
    { code: '8901030000010', name: 'Parle-G Biscuits 250g', icon: '🍪' },
    { code: '8906007280011', name: 'Fortune Oil 1L', icon: '🏺' },
    { code: '8902080005020', name: 'Tropicana Juice 1L', icon: '🧃' },
  ];

  const handleSimulateScan = (barcodeToScan) => {
    setIsScanning(true);
    setScannedResult(null);

    // Audio beep simulation
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 1200;
      osc.start();
      setTimeout(() => { osc.stop(); }, 120);
    } catch (e) {
      // Audio fallback
    }

    setTimeout(() => {
      setIsScanning(false);
      const found = products.find(p => p.barcode === barcodeToScan);
      if (found) {
        setScannedResult({ found: true, product: found });
      } else {
        setScannedResult({ 
          found: false, 
          barcode: barcodeToScan,
          message: 'Product not found in current inventory. Add as new product?' 
        });
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Barcode Scanner</h3>
              <p className="text-xs text-slate-500">Scan product packaging or simulate code lookup</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Simulation Box */}
        <div className="mt-4 relative bg-slate-950 rounded-2xl h-52 flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-indigo-400/50">
          
          {/* Laser Line animation */}
          <div className="absolute inset-x-8 top-1/2 h-0.5 bg-red-500 shadow-[0_0_12px_#ef4444] animate-pulse"></div>

          <div className="z-10 text-center px-4">
            <Scan className="w-12 h-12 text-indigo-400 mx-auto mb-2 animate-bounce" />
            <p className="text-white font-semibold text-sm">Align Barcode Inside Frame</p>
            <p className="text-slate-400 text-xs mt-1">Camera Feed Active • Auto Focus Enabled</p>
          </div>

          {isScanning && (
            <div className="absolute inset-0 bg-indigo-900/80 backdrop-blur-xs flex items-center justify-center text-white font-bold">
              Scanning code...
            </div>
          )}
        </div>

        {/* Quick Sample Click Buttons */}
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Tap a Demo Product Barcode to Scan:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {sampleBarcodes.map((item) => (
              <button
                key={item.code}
                onClick={() => handleSimulateScan(item.code)}
                className="flex items-center space-x-2 text-left p-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl transition text-xs"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="truncate">
                  <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{item.code}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Barcode Input */}
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Or enter barcode manually (e.g. 890126...)"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleSimulateScan(manualBarcode)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            Lookup
          </button>
        </div>

        {/* Scanned Result Banner */}
        {scannedResult && (
          <div className="mt-4">
            {scannedResult.found ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{scannedResult.product.image}</span>
                  <div>
                    <p className="font-bold text-sm text-green-900">{scannedResult.product.name}</p>
                    <p className="text-xs text-green-700">
                      Stock: {scannedResult.product.quantity} units | Expiry: {scannedResult.product.expiryDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSelectScannedProduct(scannedResult.product);
                    onClose();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
                >
                  View Details
                </button>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-800 font-medium">{scannedResult.message}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
