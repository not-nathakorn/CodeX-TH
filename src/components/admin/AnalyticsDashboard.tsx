import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Loader2, RefreshCcw, Trash2, Globe, Monitor, Smartphone, Activity, Shield, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface WebsiteVisit {
  id: string;
  created_at: string;
  page_path: string;
  referrer: string;
  session_id: string;
  os: string;
  device_type: string;
  country: string;
}

interface CountData {
  name: string;
  count: number;
}

interface ChartDataPoint {
  name: string;
  visitors: number;
  pageViews: number;
}

interface DailyStats {
  [date: string]: {
    name: string;
    visitors: Set<string>;
    pageViews: number;
  };
}

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  sub: string;
}

interface ListCardProps {
  title: string;
  icon: React.ReactElement;
  data: CountData[];
  onItemClick?: (name: string) => void;
}

export const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    visitors: number;
    pageViews: number;
    chartData: ChartDataPoint[];
    topPages: CountData[];
    referrers: CountData[];
    os: CountData[];
    devices: CountData[];
    countries: CountData[];
  }>({
    visitors: 0,
    pageViews: 0,
    chartData: [],
    topPages: [],
    referrers: [],
    os: [],
    devices: [],
    countries: []
  });

  // State for page detail dialog
  const [showPageDetail, setShowPageDetail] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [loginActivity, setLoginActivity] = useState<Array<{
    id: string;
    email: string;
    status: string;
    ip_address: string;
    device: string;
    browser: string;
    location: string;
    created_at: string;
  }>>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

  console.log('Rendering AnalyticsDashboard. Loading:', loading, 'Stats:', stats);

  // Fetch login activity for admin page access
  const fetchLoginActivity = async () => {
    setLoadingActivity(true);
    try {
      const { data, error } = await supabase
        .from('login_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setLoginActivity(data || []);
    } catch (error) {
      console.error('Error fetching login activity:', error);
      toast.error('ไม่สามารถโหลดข้อมูลการเข้าถึงได้');
    } finally {
      setLoadingActivity(false);
    }
  };

  // Handle page click
  const handlePageClick = async (pageName: string) => {
    setSelectedPage(pageName);
    if (pageName.includes('/admin')) {
      setShowPageDetail(true);
      await fetchLoginActivity();
    }
  };

  useEffect(() => {
    console.log('AnalyticsDashboard mounted');
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    console.log('Starting fetchAnalytics...');
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_visits')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetch success. Data count:', data?.length);

      if (!data || data.length === 0) {
        console.log('No data found, resetting stats');
        setStats({
          visitors: 0,
          pageViews: 0,
          chartData: [],
          topPages: [],
          referrers: [],
          os: [],
          devices: [],
          countries: []
        });
        setLoading(false);
        return;
      }

      // 1. Process Chart Data
      const dailyStats = data.reduce<DailyStats>((acc, visit) => {
        const date = new Date(visit.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        // eslint-disable-next-line security/detect-object-injection
        if (!acc[date]) acc[date] = { name: date, visitors: new Set(), pageViews: 0 };
        
        // eslint-disable-next-line security/detect-object-injection
        acc[date].pageViews++;
        // eslint-disable-next-line security/detect-object-injection
        if (visit.session_id) acc[date].visitors.add(visit.session_id);
        
        return acc;
      }, {});

      const chartData: ChartDataPoint[] = Object.values(dailyStats).map((day) => ({
        name: day.name,
        visitors: day.visitors.size,
        pageViews: day.pageViews
      }));

      // Helper to process counts
      const processCount = (key: keyof WebsiteVisit): CountData[] => {
        const counts = data.reduce<Record<string, number>>((acc, visit) => {
          // eslint-disable-next-line security/detect-object-injection
          const val = visit[key] || 'Unknown';
          const valStr = String(val);
          // eslint-disable-next-line security/detect-object-injection
          acc[valStr] = (acc[valStr] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(counts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
      };

      // Unique Visitors
      const uniqueVisitors = new Set(data.map((v) => v.session_id)).size;

      const newStats = {
        visitors: uniqueVisitors,
        pageViews: data.length,
        chartData,
        topPages: processCount('page_path'),
        referrers: processCount('referrer'),
        os: processCount('os'),
        devices: processCount('device_type'),
        countries: processCount('country')
      };

      console.log('Stats processed:', newStats);
      setStats(newStats);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      console.log('Fetch finished, setLoading(false)');
      setLoading(false);
    }
  };


  const handleResetData = async () => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลสถิติทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้')) return;
    
    setLoading(true);
    try {
      // Method 1: Try to delete with a very broad condition
      const { data, error, count } = await supabase
        .from('website_visits')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
        .select();
      
      if (error) {
        console.error('Delete error:', error);
        
        // If RLS blocks delete, show helpful error message
        if (error.code === '42501' || error.message.includes('policy')) {
          toast.error('ไม่มีสิทธิ์ลบข้อมูล - กรุณาเพิ่ม DELETE policy ใน Supabase');
          toast.info('รัน SQL: CREATE POLICY "Allow delete" ON website_visits FOR DELETE USING (true);');
        } else {
          toast.error(`เกิดข้อผิดพลาด: ${error.message}`);
        }
        return;
      }
      
      console.log('Deleted records:', count);
      
      // Reset stats immediately
      setStats({
        visitors: 0,
        pageViews: 0,
        chartData: [],
        topPages: [],
        referrers: [],
        os: [],
        devices: [],
        countries: []
      });
      
      toast.success(`ล้างข้อมูลเรียบร้อย (ลบ ${count || 0} รายการ)`);
      
      // Fetch fresh data to confirm
      await fetchAnalytics();
    } catch (error) {
      console.error('Error resetting data:', error);
      toast.error('เกิดข้อผิดพลาดในการล้างข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8 p-2 md:p-4">
      {/* Header Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={fetchAnalytics} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
        <Button variant="destructive" size="sm" onClick={handleResetData} className="opacity-80 hover:opacity-100">
          <Trash2 className="w-4 h-4 mr-2" />
          Reset Data
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Visitors" value={stats.visitors} icon={<Activity className="w-5 h-5 text-blue-500" />} sub="Unique Sessions" />
        <Card title="Page Views" value={stats.pageViews} icon={<Monitor className="w-5 h-5 text-purple-500" />} sub="Total Loads" />
        <Card title="Avg. Duration" value="--" icon={<RefreshCcw className="w-5 h-5 text-green-500" />} sub="Coming Soon" />
      </div>

      {/* Main Chart */}
      <div
        className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Traffic Overview
          </h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.chartData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  borderRadius: '12px', 
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorVisitors)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ListCard title="Top Pages" icon={<Monitor />} data={stats.topPages} onItemClick={handlePageClick} />
        <ListCard title="Referrers" icon={<Globe />} data={stats.referrers} />
        <ListCard title="Operating Systems" icon={<Monitor />} data={stats.os} />
        <ListCard title="Devices" icon={<Smartphone />} data={stats.devices} />
        <ListCard title="Countries" icon={<Globe />} data={stats.countries} />
      </div>

      {/* Admin Access Details Dialog */}
      <Dialog open={showPageDetail} onOpenChange={setShowPageDetail}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="w-5 h-5 text-blue-500" />
              การเข้าถึง {selectedPage}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              ประวัติการเข้าสู่ระบบและการพยายามเข้าถึงหน้า Admin
            </DialogDescription>
          </DialogHeader>
          
          {loadingActivity ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              {/* Summary - Responsive grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {loginActivity.filter(a => a.status === 'success').length}
                  </p>
                  <p className="text-[10px] sm:text-xs text-green-600">เข้าสู่ระบบสำเร็จ</p>
                </div>
                <div className="p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                  <p className="text-lg sm:text-2xl font-bold text-red-600">
                    {loginActivity.filter(a => a.status === 'failed').length}
                  </p>
                  <p className="text-[10px] sm:text-xs text-red-600">ล้มเหลว</p>
                </div>
                <div className="p-2 sm:p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-center">
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">
                    {loginActivity.filter(a => a.status === 'unauthorized').length}
                  </p>
                  <p className="text-[10px] sm:text-xs text-orange-600">ไม่มีสิทธิ์</p>
                </div>
              </div>

              {/* Activity List - Responsive layout */}
              {loginActivity.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">ยังไม่มีข้อมูลการเข้าถึง</p>
              ) : (
                loginActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 gap-2"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      {activity.status === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                      ) : activity.status === 'unauthorized' ? (
                        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{activity.email}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {activity.device} • {activity.browser} • {activity.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          IP: {activity.ip_address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end sm:flex-col gap-2 pl-8 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 mt-1 sm:mt-0">
                      <span className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${
                        activity.status === 'success'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : activity.status === 'unauthorized'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {activity.status === 'success' ? 'สำเร็จ' : activity.status === 'unauthorized' ? 'ไม่มีสิทธิ์' : 'ล้มเหลว'}
                      </span>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(activity.created_at).toLocaleString('th-TH')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Sub-components for cleaner code
const Card = ({ title, value, icon, sub }: CardProps) => (
  <div 
    className="relative bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200 hover:shadow-md z-10"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="text-3xl font-bold mt-2 gradient-text">{value}</h4>
      </div>
      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
        {icon}
      </div>
    </div>
    <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
      <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      {sub}
    </div>
  </div>
);

const ListCard = ({ title, icon, data, onItemClick }: ListCardProps) => (
  <div 
    className="relative bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm z-10"
  >
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
      {React.cloneElement(icon, { className: "w-5 h-5 text-primary" })}
      {title}
    </h3>
    <div className="space-y-3">
      {data.map((item, i) => (
        <div 
          key={i} 
          className={`flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-100/10 ${
            onItemClick && item.name.includes('/admin') ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-700' : ''
          }`}
          onClick={() => onItemClick && item.name.includes('/admin') && onItemClick(item.name)}
        >
          <span className="text-sm font-medium text-foreground/80 truncate max-w-[70%]">
            {item.name}
            {onItemClick && item.name.includes('/admin') && (
              <span className="ml-2 text-xs text-blue-500">(คลิกดูรายละเอียด)</span>
            )}
          </span>
          <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-1 rounded-lg">{item.count}</span>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No data available</p>
      )}
    </div>
  </div>
);
