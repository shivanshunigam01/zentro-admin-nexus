import { Users, Package, Mail, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,458',
      icon: Users,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: 'Active Leads',
      value: '3,842',
      icon: TrendingUp,
      trend: { value: 8.2, isPositive: true },
    },
    {
      title: 'Products',
      value: '245',
      icon: Package,
      trend: { value: 3.1, isPositive: false },
    },
    {
      title: 'Messages',
      value: '892',
      icon: Mail,
      trend: { value: 15.3, isPositive: true },
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, action: 'Product updated', user: 'Jane Smith', time: '15 minutes ago' },
    { id: 3, action: 'New lead created', user: 'Mike Johnson', time: '1 hour ago' },
    { id: 4, action: 'Category deleted', user: 'Sarah Wilson', time: '2 hours ago' },
    { id: 5, action: 'Blog post published', user: 'Tom Brown', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your application's performance and activities
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="font-heading">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="font-heading">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-24 gradient-primary text-white shadow-elegant hover:opacity-90 transition-smooth flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Add User</span>
                </Button>
                <Button className="h-24 gradient-primary text-white shadow-elegant hover:opacity-90 transition-smooth flex-col">
                  <Package className="h-6 w-6 mb-2" />
                  <span>New Product</span>
                </Button>
                <Button className="h-24 gradient-primary text-white shadow-elegant hover:opacity-90 transition-smooth flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span>Add Lead</span>
                </Button>
                <Button className="h-24 gradient-primary text-white shadow-elegant hover:opacity-90 transition-smooth flex-col">
                  <Mail className="h-6 w-6 mb-2" />
                  <span>Send Message</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
