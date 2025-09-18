import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { DashboardStats, Order } from '../../types';
import { StatsCard } from './StatsCard';
import { RecentOrders } from './RecentOrders';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  TrendingUp
} from 'lucide-react';
import { Card } from '../ui/Card';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Since we don't have data yet, let's show mock data
      const mockStats: DashboardStats = {
        totalRevenue: 12450.75,
        totalOrders: 156,
        totalProducts: 24,
        totalCustomers: 89,
        recentOrders: [
          {
            id: '1',
            customer_id: '1',
            customer_name: 'Alice Johnson',
            customer_email: 'alice@example.com',
            total_amount: 25.50,
            status: 'completed',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
            order_items: []
          },
          {
            id: '2',
            customer_id: '2',
            customer_name: 'Bob Smith',
            customer_email: 'bob@example.com',
            total_amount: 45.25,
            status: 'preparing',
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
            order_items: []
          },
          {
            id: '3',
            customer_id: '3',
            customer_name: 'Carol Davis',
            customer_email: 'carol@example.com',
            total_amount: 32.00,
            status: 'confirmed',
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
            order_items: []
          }
        ],
        topProducts: [
          { product_name: 'Chocolate Truffles', total_sold: 45, revenue: 675.00 },
          { product_name: 'Strawberry Gummies', total_sold: 38, revenue: 456.00 },
          { product_name: 'Caramel Fudge', total_sold: 32, revenue: 384.00 }
        ]
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-xl h-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          trend={{ value: 8.3, isPositive: true }}
          color="pink"
        />
        <StatsCard
          title="Products"
          value={stats.totalProducts}
          icon={Package}
          trend={{ value: 2.1, isPositive: true }}
          color="orange"
        />
        <StatsCard
          title="Customers"
          value={stats.totalCustomers}
          icon={Users}
          trend={{ value: 15.2, isPositive: true }}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <RecentOrders orders={stats.recentOrders} />

        {/* Top Products */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {stats.topProducts.map((product, index) => (
              <div key={product.product_name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.product_name}</p>
                    <p className="text-sm text-gray-600">{product.total_sold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${product.revenue.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <Package className="w-8 h-8 mb-2" />
            <h4 className="font-semibold">Add New Product</h4>
            <p className="text-sm opacity-90">Add a new sweet to inventory</p>
          </button>
          <button className="p-4 text-left bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <ShoppingCart className="w-8 h-8 mb-2" />
            <h4 className="font-semibold">Create Order</h4>
            <p className="text-sm opacity-90">Process a new customer order</p>
          </button>
          <button className="p-4 text-left bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <Users className="w-8 h-8 mb-2" />
            <h4 className="font-semibold">Add Customer</h4>
            <p className="text-sm opacity-90">Register a new customer</p>
          </button>
        </div>
      </Card>
    </div>
  );
};