import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Receipt, DollarSign, TrendingUp, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Bill {
  id: string;
  filename: string;
  vendor_email: string;
  amount: number | null;
  purchase_date: string;
  s3_key: string;
  created_at: string;
}

interface CustomerStats {
  totalBills: number;
  totalSpent: number;
  monthlySpent: number;
  vendorCount: number;
}

const CustomerDashboard = () => {
  const navigate = useNavigate()
  const { role, username,token } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    totalBills: 0,
    totalSpent: 0,
    monthlySpent: 0,
    vendorCount: 0
  });

  if(!token){
    navigate('/login')
    return;
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === 'customer') {
      // TODO: Implement bills fetching from your backend
    }
  }, [role]);

  // TODO: Implement fetchBills and calculateStats functions

  const handleDownload = async (bill: Bill) => {
    try {
      // In a real implementation, you would get a presigned download URL from S3
      toast.info('Download functionality would be implemented with S3 presigned URLs');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download bill');
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (role !== 'customer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access denied. This dashboard is for customers only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {username}</p>
            <p className="text-sm text-muted-foreground mt-2">Customer content will be available soon.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBills}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.monthlySpent)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendors</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.vendorCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bills List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Bills</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : bills.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bills found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{bill.filename}</h3>
                          <p className="text-sm text-muted-foreground">
                            From: {bill.vendor_email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Date: {formatDate(bill.purchase_date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(bill.amount)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(bill)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;