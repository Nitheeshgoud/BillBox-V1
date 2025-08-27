import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Since we can't import, we'll declare Chart.js is available.
// In a real project: import { Chart } from 'chart.js';
Chart.register(...registerables);

// --- HELPER & MOCK DATA ---
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- ICONS (lucide-react style) ---
const LayoutDashboard = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const BarChart3 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
const StoreIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7"/></svg>;
const CreditCard = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const LogOut = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const Users = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const UserCheck = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>;
const UserX = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/></svg>;
const Crown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M12 20v-2"/></svg>;
const ChevronDown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const Download = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;

// --- MOCK DATA & TYPES ---
const mockStores = [ { id: 'all', name: 'All Stores' }, { id: 'store_kphb_123', name: 'KPHB Branch' }, { id: 'store_miyapur_456', name: 'Miyapur Branch' }];
const mockCustomerData = Array.from({ length: 50 }, (_, i) => ({ id: `cust_${i + 1}`, phoneNumber: `+91 98765 432${String(i).padStart(2, '0')}`, totalVisits: Math.floor(Math.random() * 20) + 1, totalSpent: Math.floor(Math.random() * 5000) + 50, firstVisit: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(), lastVisit: new Date(2025, 6, Math.floor(Math.random() * 30) + 1).toISOString(), isRepeated: Math.random() > 0.3, }));

// --- UI COMPONENTS ---

const Sidebar = () => (
    <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0 h-screen sticky top-0">
        <div className="flex items-center h-20 px-6 flex-shrink-0">
            <svg className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <h1 className="ml-3 text-2xl font-bold">BillBox</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
                <span className="ml-4 font-semibold">Dashboard</span>
            </a>
            <a href="#" className="flex items-center p-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                <BarChart3 className="h-6 w-6" />
                <span className="ml-4 font-semibold">Reports</span>
            </a>
            <a href="#" className="flex items-center p-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                <StoreIcon className="h-6 w-6" />
                <span className="ml-4 font-semibold">Stores</span>
            </a>
            <a href="#" className="flex items-center p-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                <CreditCard className="h-6 w-6" />
                <span className="ml-4 font-semibold">Billing</span>
            </a>
        </nav>
        <div className="px-4 py-6">
            <a href="#" className="flex items-center p-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                <LogOut className="h-6 w-6" />
                <span className="ml-4 font-semibold">Logout</span>
            </a>
        </div>
    </aside>
);

const DashboardHeader = () => (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold text-white">Good morning, Vasanth!</h2>
            <p className="text-gray-400 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
             <label htmlFor="store-selector" className="text-sm text-gray-400">Viewing Store:</label>
            <select id="store-selector" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5">
                {mockStores.map(store => <option key={store.id} value={store.id}>{store.name}</option>)}
            </select>
        </div>
    </header>
);

const InstallSoftwareBanner = () => (
    <div className="bg-indigo-500/20 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between mb-8 border border-indigo-500/30">
        <div>
            <h3 className="text-lg font-bold text-white">Install BillBox Software</h3>
            <p className="text-gray-300 mt-1 text-sm">Get started with our desktop application to manage your bills efficiently</p>
        </div>
        <a href="#" className="bg-white text-gray-800 font-semibold px-5 py-2.5 rounded-lg mt-4 sm:mt-0 flex items-center hover:bg-gray-200 transition-colors">
            <Download className="h-5 w-5 mr-2" />
            Download Now
        </a>
    </div>
);


const StatCard = ({ title, value, valueColor = 'text-white' }) => (
    <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className={cn("text-3xl lg:text-4xl font-bold mt-2", valueColor)}>{value}</p>
    </div>
);

const SummaryKpiSection = () => {
    const repeatedCustomers = mockCustomerData.filter(c => c.isRepeated).length;
    const totalCustomers = mockCustomerData.length;
    const repeatedPercent = Math.round((repeatedCustomers / totalCustomers) * 100);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Customers" value={totalCustomers.toLocaleString()} />
            <StatCard title="Repeat Customer Rate" value={`${repeatedPercent}%`} valueColor="text-green-400" />
            <StatCard title="Avg. Transaction Value" value={`₹${(mockCustomerData.reduce((sum, c) => sum + c.totalSpent, 0) / totalCustomers).toFixed(0)}`} />
            <StatCard title="New Customers (This Month)" value={"120"} />
        </div>
    );
};

const ChartCard = ({ title, children, timeUnitSelector }) => (
    <div className="bg-gray-800 p-6 rounded-xl h-full">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {timeUnitSelector && (<select defaultValue="monthly" className="text-xs bg-gray-700 border-gray-600 text-white rounded-md focus:ring-2 focus:ring-indigo-500"><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select>)}
        </div>
        <div className="h-80">{children}</div>
    </div>
);

const CustomerAnalyticsSection = () => {
    const visitsChartRef = useRef(null);
    const newVsReturningChartRef = useRef(null);
    useEffect(() => {
        const chartInstances = [];
        if (visitsChartRef.current) {
            const visitsCtx = visitsChartRef.current.getContext('2d');
            chartInstances.push(new Chart(visitsCtx, { type: 'bar', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Visits', data: [120, 150, 180, 130, 160, 200], backgroundColor: 'rgba(99, 102, 241, 0.7)' }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9CA3AF' } }, x: { grid: { display: false }, ticks: { color: '#9CA3AF' } } } } }));
        }
        if (newVsReturningChartRef.current) {
            const newVsReturningCtx = newVsReturningChartRef.current.getContext('2d');
            chartInstances.push(new Chart(newVsReturningCtx, { type: 'doughnut', data: { labels: ['New Customers', 'Returning Customers'], datasets: [{ data: [35, 65], backgroundColor: ['#4f46e5', '#a5b4fc'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom', labels: { color: '#9CA3AF' } } } } }));
        }
        return () => chartInstances.forEach(chart => chart.destroy());
    }, []);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2"><ChartCard title="Visits Over Time" timeUnitSelector><canvas ref={visitsChartRef}></canvas></ChartCard></div>
            <div><ChartCard title="New vs Returning Customers"><canvas ref={newVsReturningChartRef}></canvas></ChartCard></div>
        </div>
    );
};

const CustomerExplorerSection = () => {
    const [filter, setFilter] = useState('');
    const filteredData = useMemo(() => mockCustomerData.filter(c => c.phoneNumber.includes(filter)), [filter]);
    return (
        <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Customer Explorer</h3>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <input type="text" placeholder="Search phone..." value={filter} onChange={e => setFilter(e.target.value)} className="text-sm bg-gray-700 border-gray-600 text-white rounded-md focus:ring-2 focus:ring-indigo-500 w-40"/>
                    <button className="flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"><Download className="h-4 w-4 mr-2" />Export CSV</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Phone Number</th><th scope="col" className="px-6 py-3">Total Visits</th><th scope="col" className="px-6 py-3">Total Spent</th><th scope="col" className="px-6 py-3">Last Visit</th><th scope="col" className="px-6 py-3">Repeated?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.slice(0, 10).map(c => (
                            <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{c.phoneNumber}</td>
                                <td className="px-6 py-4">{c.totalVisits}</td>
                                <td className="px-6 py-4">₹{c.totalSpent.toLocaleString()}</td>
                                <td className="px-6 py-4">{new Date(c.lastVisit).toLocaleDateString()}</td>
                                <td className="px-6 py-4"><span className={cn("px-2 py-1 text-xs font-medium rounded-full", c.isRepeated ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-300")}>{c.isRepeated ? 'Yes' : 'No'}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen">
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <DashboardHeader />
                    <InstallSoftwareBanner />
                    <SummaryKpiSection />
                    <CustomerAnalyticsSection />
                    <CustomerExplorerSection />
                </main>
            </div>
        </div>
    </div>
  );
}
